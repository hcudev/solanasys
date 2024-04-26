/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  Codec,
  Decoder,
  Encoder,
  IAccountMeta,
  IAccountSignerMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  TransactionSigner,
  WritableSignerAccount,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { SYSTEM_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type AllocateInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountNewAccount extends string
        ? WritableSignerAccount<TAccountNewAccount> &
            IAccountSignerMeta<TAccountNewAccount>
        : TAccountNewAccount,
      ...TRemainingAccounts,
    ]
  >;

export type AllocateInstructionData = { discriminator: number; space: bigint };

export type AllocateInstructionDataArgs = { space: number | bigint };

export function getAllocateInstructionDataEncoder(): Encoder<AllocateInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU32Encoder()],
      ['space', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 8 })
  );
}

export function getAllocateInstructionDataDecoder(): Decoder<AllocateInstructionData> {
  return getStructDecoder([
    ['discriminator', getU32Decoder()],
    ['space', getU64Decoder()],
  ]);
}

export function getAllocateInstructionDataCodec(): Codec<
  AllocateInstructionDataArgs,
  AllocateInstructionData
> {
  return combineCodec(
    getAllocateInstructionDataEncoder(),
    getAllocateInstructionDataDecoder()
  );
}

export type AllocateInput<TAccountNewAccount extends string = string> = {
  newAccount: TransactionSigner<TAccountNewAccount>;
  space: AllocateInstructionDataArgs['space'];
};

export function getAllocateInstruction<TAccountNewAccount extends string>(
  input: AllocateInput<TAccountNewAccount>
): AllocateInstruction<typeof SYSTEM_PROGRAM_ADDRESS, TAccountNewAccount> {
  // Program address.
  const programAddress = SYSTEM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    newAccount: { value: input.newAccount ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.newAccount)],
    programAddress,
    data: getAllocateInstructionDataEncoder().encode(
      args as AllocateInstructionDataArgs
    ),
  } as AllocateInstruction<typeof SYSTEM_PROGRAM_ADDRESS, TAccountNewAccount>;

  return instruction;
}

export type ParsedAllocateInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    newAccount: TAccountMetas[0];
  };
  data: AllocateInstructionData;
};

export function parseAllocateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAllocateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
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
      newAccount: getNextAccount(),
    },
    data: getAllocateInstructionDataDecoder().decode(instruction.data),
  };
}
