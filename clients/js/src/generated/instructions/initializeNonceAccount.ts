/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type WritableAccount,
} from '@solana/web3.js';
import { SYSTEM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type InitializeNonceAccountInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountNonceAccount extends string | IAccountMeta<string> = string,
  TAccountRecentBlockhashesSysvar extends
    | string
    | IAccountMeta<string> = 'SysvarRecentB1ockHashes11111111111111111111',
  TAccountRentSysvar extends
    | string
    | IAccountMeta<string> = 'SysvarRent111111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountNonceAccount extends string
        ? WritableAccount<TAccountNonceAccount>
        : TAccountNonceAccount,
      TAccountRecentBlockhashesSysvar extends string
        ? ReadonlyAccount<TAccountRecentBlockhashesSysvar>
        : TAccountRecentBlockhashesSysvar,
      TAccountRentSysvar extends string
        ? ReadonlyAccount<TAccountRentSysvar>
        : TAccountRentSysvar,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeNonceAccountInstructionData = {
  discriminator: number;
  nonceAuthority: Address;
};

export type InitializeNonceAccountInstructionDataArgs = {
  nonceAuthority: Address;
};

export function getInitializeNonceAccountInstructionDataEncoder(): Encoder<InitializeNonceAccountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU32Encoder()],
      ['nonceAuthority', getAddressEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 6 })
  );
}

export function getInitializeNonceAccountInstructionDataDecoder(): Decoder<InitializeNonceAccountInstructionData> {
  return getStructDecoder([
    ['discriminator', getU32Decoder()],
    ['nonceAuthority', getAddressDecoder()],
  ]);
}

export function getInitializeNonceAccountInstructionDataCodec(): Codec<
  InitializeNonceAccountInstructionDataArgs,
  InitializeNonceAccountInstructionData
> {
  return combineCodec(
    getInitializeNonceAccountInstructionDataEncoder(),
    getInitializeNonceAccountInstructionDataDecoder()
  );
}

export type InitializeNonceAccountInput<
  TAccountNonceAccount extends string = string,
  TAccountRecentBlockhashesSysvar extends string = string,
  TAccountRentSysvar extends string = string,
> = {
  nonceAccount: Address<TAccountNonceAccount>;
  recentBlockhashesSysvar?: Address<TAccountRecentBlockhashesSysvar>;
  rentSysvar?: Address<TAccountRentSysvar>;
  nonceAuthority: InitializeNonceAccountInstructionDataArgs['nonceAuthority'];
};

export function getInitializeNonceAccountInstruction<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountRentSysvar extends string,
>(
  input: InitializeNonceAccountInput<
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountRentSysvar
  >
): InitializeNonceAccountInstruction<
  typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountNonceAccount,
  TAccountRecentBlockhashesSysvar,
  TAccountRentSysvar
> {
  // Program address.
  const programAddress = SYSTEM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    nonceAccount: { value: input.nonceAccount ?? null, isWritable: true },
    recentBlockhashesSysvar: {
      value: input.recentBlockhashesSysvar ?? null,
      isWritable: false,
    },
    rentSysvar: { value: input.rentSysvar ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.recentBlockhashesSysvar.value) {
    accounts.recentBlockhashesSysvar.value =
      'SysvarRecentB1ockHashes11111111111111111111' as Address<'SysvarRecentB1ockHashes11111111111111111111'>;
  }
  if (!accounts.rentSysvar.value) {
    accounts.rentSysvar.value =
      'SysvarRent111111111111111111111111111111111' as Address<'SysvarRent111111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.nonceAccount),
      getAccountMeta(accounts.recentBlockhashesSysvar),
      getAccountMeta(accounts.rentSysvar),
    ],
    programAddress,
    data: getInitializeNonceAccountInstructionDataEncoder().encode(
      args as InitializeNonceAccountInstructionDataArgs
    ),
  } as InitializeNonceAccountInstruction<
    typeof SYSTEM_PROGRAM_ADDRESS,
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountRentSysvar
  >;

  return instruction;
}

export type ParsedInitializeNonceAccountInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    nonceAccount: TAccountMetas[0];
    recentBlockhashesSysvar: TAccountMetas[1];
    rentSysvar: TAccountMetas[2];
  };
  data: InitializeNonceAccountInstructionData;
};

export function parseInitializeNonceAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeNonceAccountInstruction<TProgram, TAccountMetas> {
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
      nonceAccount: getNextAccount(),
      recentBlockhashesSysvar: getNextAccount(),
      rentSysvar: getNextAccount(),
    },
    data: getInitializeNonceAccountInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
