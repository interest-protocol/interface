import { ethers } from 'ethers';

import { CHAIN_ID, CONTRACTS, TOKEN_SYMBOL } from '@/sdk';
import { getDNRAddress } from '@/utils';

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
        depositTokenSymbol: TOKEN_SYMBOL.BUSD,
        depositTokenAddress: CONTRACTS.BUSD[CHAIN_ID.BNB_TEST_NET],
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

export const DV_VAULT_DETAILS_CALL_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [ethers.utils.getAddress('0x10f3c9debac2398d5c791641c8847459353233b4')]:
      CONTRACTS.BUSD[CHAIN_ID.BNB_TEST_NET],
  },
  [CHAIN_ID.BNB_MAIN_NET]: {},
  [CHAIN_ID.UNSUPPORTED]: {},
  [CHAIN_ID.RINKEBY]: {},
};

export const DV_VAULT_RESPONSE_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: {
    [ethers.utils.getAddress('0x10f3c9debac2398d5c791641c8847459353233b4')]: {
      vaultAddress: '0x10f3c9debac2398d5c791641c8847459353233b4',
      depositTokenSymbol: TOKEN_SYMBOL.BUSD,
      depositTokenAddress: CONTRACTS.BUSD[CHAIN_ID.BNB_TEST_NET],
      depositTokenDecimals: 18,
      dineroAddress: getDNRAddress(CHAIN_ID.BNB_TEST_NET),
      dineroDecimals: 18,
    },
  },
  [CHAIN_ID.BNB_MAIN_NET]: {},
  [CHAIN_ID.UNSUPPORTED]: {},
  [CHAIN_ID.RINKEBY]: {},
};
