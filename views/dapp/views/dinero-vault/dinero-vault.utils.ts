import { ethers } from 'ethers';

import { DV_VAULT_RESPONSE_MAP } from '@/constants';
import { CHAIN_ID, TOKEN_SYMBOL, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { hasKeys } from '@/utils';

import {
  ProcessDineroVault,
  TDineroVaultData,
  TDineroVaultDataKeys,
} from './dinero-vault.types';

const DEFAULT_DATA = {
  vaultAddress: ZERO_ADDRESS,
  depositTokenSymbol: TOKEN_SYMBOL.Unknown,
  depositTokenAddress: ZERO_ADDRESS,
  depositTokenDecimals: 18,
  dineroAddress: ZERO_ADDRESS,
  dineroDecimals: 18,
  maxDineroAmount: ZERO_BIG_NUMBER,
  mintedDineroAmount: ZERO_BIG_NUMBER,
  depositAmount: ZERO_BIG_NUMBER,
  underlyingBalance: ZERO_BIG_NUMBER,
  underlyingAllowance: ZERO_BIG_NUMBER,
  dineroBalance: ZERO_BIG_NUMBER,
  chainId: CHAIN_ID.BNB_TEST_NET,
};

const DINERO_VAULT_DATA_KEYS: ReadonlyArray<TDineroVaultDataKeys> = [
  'depositAmount',
  'dineroBalance',
  'maxDineroAmount',
  'mintedDineroAmount',
  'underlyingAllowance',
  'underlyingBalance',
];

const isMissingAttribute = (dineroVaultData: TDineroVaultData) =>
  !hasKeys<TDineroVaultData>(DINERO_VAULT_DATA_KEYS, dineroVaultData);

export const processDineroVault: ProcessDineroVault = (
  chainId,
  vaultAddress,
  data
) => {
  if (!chainId || !data || isMissingAttribute(data))
    return {
      loading: true,
      data: DEFAULT_DATA,
    };

  const extraData =
    DV_VAULT_RESPONSE_MAP[chainId][ethers.utils.getAddress(vaultAddress)];

  return {
    loading: false,
    data: {
      ...extraData,
      depositAmount: data.depositAmount,
      maxDineroAmount: data.maxDineroAmount,
      mintedDineroAmount: data.mintedDineroAmount,
      underlyingAllowance: data.underlyingAllowance,
      underlyingBalance: data.underlyingBalance,
      dineroBalance: data.dineroBalance,
      chainId,
    },
  };
};
