/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { SYSTEM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type TransferSolWithSeedInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountSource extends string | IAccountMeta<string> = string,
  TAccountBaseAccount extends string | IAccountMeta<string> = string,
  TAccountDestination extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountSource extends string
        ? WritableAccount<TAccountSource>
        : TAccountSource,
      TAccountBaseAccount extends string
        ? ReadonlySignerAccount<TAccountBaseAccount> &
            IAccountSignerMeta<TAccountBaseAccount>
        : TAccountBaseAccount,
      TAccountDestination extends string
        ? WritableAccount<TAccountDestination>
        : TAccountDestination,
      ...TRemainingAccounts,
    ]
  >;

export type TransferSolWithSeedInstructionData = {
  discriminator: number;
  amount: bigint;
  fromSeed: string;
  fromOwner: Address;
};

export type TransferSolWithSeedInstructionDataArgs = {
  amount: number | bigint;
  fromSeed: string;
  fromOwner: Address;
};

export function getTransferSolWithSeedInstructionDataEncoder(): Encoder<TransferSolWithSeedInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU32Encoder()],
      ['amount', getU64Encoder()],
      ['fromSeed', addEncoderSizePrefix(getUtf8Encoder(), getU64Encoder())],
      ['fromOwner', getAddressEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 11 })
  );
}

export function getTransferSolWithSeedInstructionDataDecoder(): Decoder<TransferSolWithSeedInstructionData> {
  return getStructDecoder([
    ['discriminator', getU32Decoder()],
    ['amount', getU64Decoder()],
    ['fromSeed', addDecoderSizePrefix(getUtf8Decoder(), getU64Decoder())],
    ['fromOwner', getAddressDecoder()],
  ]);
}

export function getTransferSolWithSeedInstructionDataCodec(): Codec<
  TransferSolWithSeedInstructionDataArgs,
  TransferSolWithSeedInstructionData
> {
  return combineCodec(
    getTransferSolWithSeedInstructionDataEncoder(),
    getTransferSolWithSeedInstructionDataDecoder()
  );
}

export type TransferSolWithSeedInput<
  TAccountSource extends string = string,
  TAccountBaseAccount extends string = string,
  TAccountDestination extends string = string,
> = {
  source: Address<TAccountSource>;
  baseAccount: TransactionSigner<TAccountBaseAccount>;
  destination: Address<TAccountDestination>;
  amount: TransferSolWithSeedInstructionDataArgs['amount'];
  fromSeed: TransferSolWithSeedInstructionDataArgs['fromSeed'];
  fromOwner: TransferSolWithSeedInstructionDataArgs['fromOwner'];
};

export function getTransferSolWithSeedInstruction<
  TAccountSource extends string,
  TAccountBaseAccount extends string,
  TAccountDestination extends string,
>(
  input: TransferSolWithSeedInput<
    TAccountSource,
    TAccountBaseAccount,
    TAccountDestination
  >
): TransferSolWithSeedInstruction<
  typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountSource,
  TAccountBaseAccount,
  TAccountDestination
> {
  // Program address.
  const programAddress = SYSTEM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    source: { value: input.source ?? null, isWritable: true },
    baseAccount: { value: input.baseAccount ?? null, isWritable: false },
    destination: { value: input.destination ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.source),
      getAccountMeta(accounts.baseAccount),
      getAccountMeta(accounts.destination),
    ],
    programAddress,
    data: getTransferSolWithSeedInstructionDataEncoder().encode(
      args as TransferSolWithSeedInstructionDataArgs
    ),
  } as TransferSolWithSeedInstruction<
    typeof SYSTEM_PROGRAM_ADDRESS,
    TAccountSource,
    TAccountBaseAccount,
    TAccountDestination
  >;

  return instruction;
}

export type ParsedTransferSolWithSeedInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    source: TAccountMetas[0];
    baseAccount: TAccountMetas[1];
    destination: TAccountMetas[2];
  };
  data: TransferSolWithSeedInstructionData;
};

export function parseTransferSolWithSeedInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedTransferSolWithSeedInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      source: getNextAccount(),
      baseAccount: getNextAccount(),
      destination: getNextAccount(),
    },
    data: getTransferSolWithSeedInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
