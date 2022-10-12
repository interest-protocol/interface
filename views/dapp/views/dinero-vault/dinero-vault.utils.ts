import { ethers } from 'ethers';

import { DV_VAULT_RESPONSE_MAP } from '@/constants';
import { CHAIN_ID, TOKEN_SYMBOL, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';

import { ProcessDineroVault } from './dinero-vault.types';

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

export const processDineroVault: ProcessDineroVault = (
  chainId,
  vaultAddress,
  data
) => {
  if (!chainId || !data)
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
