import { CHAIN_ID, CONTRACTS, TOKEN_SYMBOL } from '@/sdk';

export const VAULTS_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    dineroVaults: ['0x10f3c9debac2398d5c791641c8847459353233b4'],
  },
  [CHAIN_ID.BNB_MAIN_NET]: {
    dineroVaults: [],
  },
  [CHAIN_ID.UNSUPPORTED]: {
    dineroVaults: [],
  },
  [CHAIN_ID.RINKEBY]: {
    dineroVaults: [],
  },
};

export enum VaultTypes {
  DV,
  All, // Only to be used by the filter component. A single vault should never have this type.
}

export const VAULTS_RESPONSE_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    dineroVaults: [
      {
        vaultAddress: '0x10f3c9debac2398d5c791641c8847459353233b4',
        depositTokenSymbol: TOKEN_SYMBOL.DNR,
        depositTokenAddress: CONTRACTS.DNR[CHAIN_ID.BNB_TEST_NET],
        depositTokenDecimals: 18,
        apr: null,
        earn: null,
        type: VaultTypes.DV,
      },
    ],
  },
  [CHAIN_ID.BNB_MAIN_NET]: {
    dineroVaults: [],
  },
  [CHAIN_ID.UNSUPPORTED]: {
    dineroVaults: [],
  },
  [CHAIN_ID.RINKEBY]: {
    dineroVaults: [],
  },
};
