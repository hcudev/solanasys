import {
  Address,
  Commitment,
  CompilableTransaction,
  ITransactionWithBlockhashLifetime,
  Rpc,
  RpcSubscriptions,
  SolanaRpcApi,
  SolanaRpcSubscriptionsApi,
  TransactionSigner,
  airdropFactory,
  appendTransactionInstruction,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransaction,
  generateKeyPairSigner,
  getSignatureFromTransaction,
  lamports,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionFeePayerSigner,
  setTransactionLifetimeUsingBlockhash,
  signTransactionWithSigners,
} from '@solana/web3.js';
import {
  SYSTEM_PROGRAM_ADDRESS,
  getCreateAccountInstruction,
  getInitializeNonceAccountInstruction,
  getNonceSize,
} from '../src';

type Client = {
  rpc: Rpc<SolanaRpcApi>;
  rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
};

export const createDefaultSolanaClient = (): Client => {
  const rpc = createSolanaRpc('http://127.0.0.1:8899');
  const rpcSubscriptions = createSolanaRpcSubscriptions('ws://127.0.0.1:8900');
  return { rpc, rpcSubscriptions };
};

export const generateKeyPairSignerWithSol = async (
  client: Client,
  putativeLamports: bigint = 1_000_000_000n
) => {
  const signer = await generateKeyPairSigner();
  await airdropFactory(client)({
    recipientAddress: signer.address,
    lamports: lamports(putativeLamports),
    commitment: 'confirmed',
  });
  return signer;
};

export const createDefaultTransaction = async (
  client: Client,
  feePayer: TransactionSigner
) => {
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  return pipe(
    createTransaction({ version: 0 }),
    (tx) => setTransactionFeePayerSigner(feePayer, tx),
    (tx) => setTransactionLifetimeUsingBlockhash(latestBlockhash, tx)
  );
};

export const signAndSendTransaction = async (
  client: Client,
  transaction: CompilableTransaction & ITransactionWithBlockhashLifetime,
  commitment: Commitment = 'confirmed'
) => {
  const signedTransaction = await signTransactionWithSigners(transaction);
  const signature = getSignatureFromTransaction(signedTransaction);
  await sendAndConfirmTransactionFactory(client)(signedTransaction, {
    commitment,
  });
  return signature;
};

export const getBalance = async (client: Client, address: Address) =>
  (await client.rpc.getBalance(address, { commitment: 'confirmed' }).send())
    .value;

export const createNonceAccount = async (
  client: Client,
  payer: TransactionSigner,
  nonce: TransactionSigner,
  nonceAuthority: TransactionSigner
) => {
  const space = BigInt(getNonceSize());
  const rent = await client.rpc.getMinimumBalanceForRentExemption(space).send();
  const createAccount = getCreateAccountInstruction({
    payer,
    newAccount: nonce,
    lamports: rent,
    space,
    programAddress: SYSTEM_PROGRAM_ADDRESS,
  });
  const initializeNonceAccount = getInitializeNonceAccountInstruction({
    nonceAccount: nonce.address,
    nonceAuthority: nonceAuthority.address,
  });
  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionInstruction(createAccount, tx),
    (tx) => appendTransactionInstruction(initializeNonceAccount, tx),
    (tx) => signAndSendTransaction(client, tx)
  );
};
