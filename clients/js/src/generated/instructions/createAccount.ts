/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { BASE_ACCOUNT_SIZE } from '@solana/accounts';
import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  mapEncoder,
} from '@solana/codecs';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  WritableSignerAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import {
  IInstructionWithByteDelta,
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

export type CreateAccountInstruction<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer>
        : TAccountPayer,
      TAccountNewAccount extends string
        ? WritableSignerAccount<TAccountNewAccount>
        : TAccountNewAccount,
      ...TRemainingAccounts,
    ]
  >;

export type CreateAccountInstructionWithSigners<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountNewAccount extends string
        ? WritableSignerAccount<TAccountNewAccount> &
            IAccountSignerMeta<TAccountNewAccount>
        : TAccountNewAccount,
      ...TRemainingAccounts,
    ]
  >;

export type CreateAccountInstructionData = {
  discriminator: number;
  lamports: bigint;
  space: bigint;
  programAddress: Address;
};

export type CreateAccountInstructionDataArgs = {
  lamports: number | bigint;
  space: number | bigint;
  programAddress: Address;
};

export function getCreateAccountInstructionDataEncoder(): Encoder<CreateAccountInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder([
      ['discriminator', getU32Encoder()],
      ['lamports', getU64Encoder()],
      ['space', getU64Encoder()],
      ['programAddress', getAddressEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 0 })
  );
}

export function getCreateAccountInstructionDataDecoder(): Decoder<CreateAccountInstructionData> {
  return getStructDecoder([
    ['discriminator', getU32Decoder()],
    ['lamports', getU64Decoder()],
    ['space', getU64Decoder()],
    ['programAddress', getAddressDecoder()],
  ]);
}

export function getCreateAccountInstructionDataCodec(): Codec<
  CreateAccountInstructionDataArgs,
  CreateAccountInstructionData
> {
  return combineCodec(
    getCreateAccountInstructionDataEncoder(),
    getCreateAccountInstructionDataDecoder()
  );
}

export type CreateAccountInput<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
> = {
  payer: Address<TAccountPayer>;
  newAccount: Address<TAccountNewAccount>;
  lamports: CreateAccountInstructionDataArgs['lamports'];
  space: CreateAccountInstructionDataArgs['space'];
  programAddress: CreateAccountInstructionDataArgs['programAddress'];
};

export type CreateAccountInputWithSigners<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  newAccount: TransactionSigner<TAccountNewAccount>;
  lamports: CreateAccountInstructionDataArgs['lamports'];
  space: CreateAccountInstructionDataArgs['space'];
  programAddress: CreateAccountInstructionDataArgs['programAddress'];
};

export function getCreateAccountInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TProgram extends string = '11111111111111111111111111111111',
>(
  input: CreateAccountInputWithSigners<TAccountPayer, TAccountNewAccount>
): CreateAccountInstructionWithSigners<
  TProgram,
  TAccountPayer,
  TAccountNewAccount
> &
  IInstructionWithByteDelta;
export function getCreateAccountInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TProgram extends string = '11111111111111111111111111111111',
>(
  input: CreateAccountInput<TAccountPayer, TAccountNewAccount>
): CreateAccountInstruction<TProgram, TAccountPayer, TAccountNewAccount> &
  IInstructionWithByteDelta;
export function getCreateAccountInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TProgram extends string = '11111111111111111111111111111111',
>(
  input: CreateAccountInput<TAccountPayer, TAccountNewAccount>
): IInstruction & IInstructionWithByteDelta {
  // Program address.
  const programAddress =
    '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getCreateAccountInstructionRaw<
      TProgram,
      TAccountPayer,
      TAccountNewAccount
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    payer: { value: input.payer ?? null, isWritable: true },
    newAccount: { value: input.newAccount ?? null, isWritable: true },
  };

  // Original args.
  const args = { ...input };

  // Bytes created or reallocated by the instruction.
  const byteDelta: number = [Number(args.space) + BASE_ACCOUNT_SIZE].reduce(
    (a, b) => a + b,
    0
  );

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getCreateAccountInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as CreateAccountInstructionDataArgs,
    programAddress
  );

  return Object.freeze({ ...instruction, byteDelta });
}

export function getCreateAccountInstructionRaw<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = [],
>(
  accounts: {
    payer: TAccountPayer extends string
      ? Address<TAccountPayer>
      : TAccountPayer;
    newAccount: TAccountNewAccount extends string
      ? Address<TAccountNewAccount>
      : TAccountNewAccount;
  },
  args: CreateAccountInstructionDataArgs,
  programAddress: Address<TProgram> = '11111111111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.payer, AccountRole.WRITABLE_SIGNER),
      accountMetaWithDefault(accounts.newAccount, AccountRole.WRITABLE_SIGNER),
      ...(remainingAccounts ?? []),
    ],
    data: getCreateAccountInstructionDataEncoder().encode(args),
    programAddress,
  } as CreateAccountInstruction<
    TProgram,
    TAccountPayer,
    TAccountNewAccount,
    TRemainingAccounts
  >;
}

export type ParsedCreateAccountInstruction<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    newAccount: TAccountMetas[1];
  };
  data: CreateAccountInstructionData;
};

export function parseCreateAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateAccountInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
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
      payer: getNextAccount(),
      newAccount: getNextAccount(),
    },
    data: getCreateAccountInstructionDataDecoder().decode(instruction.data),
  };
}
