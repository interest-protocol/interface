import { ethers } from 'ethers';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { DEFAULT_ACCOUNT, DV_VAULT_DETAILS_CALL_MAP } from '@/constants';
import { useSafeContractRead } from '@/hooks';
import DineroVaultABI from '@/sdk/abi/dinero-vault.abi.json';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import { getInterestViewEarnAddress, safeToBigNumber } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';
import { VaultData } from '@/views/dapp/views/dinero-vault/dinero-vault.types';

export const useGetUserDineroVault = (
  chainId: number,
  account: string | undefined,
  vaultAddress: string
) => {
  const isValidAddress = ethers.utils.isAddress(vaultAddress);

  const underlying = isValidAddress
    ? DV_VAULT_DETAILS_CALL_MAP[chainId][ethers.utils.getAddress(vaultAddress)]
    : ethers.constants.AddressZero;

  return useSafeContractRead({
    addressOrName: getInterestViewEarnAddress(chainId),
    contractInterface: InterestViewEarnABI,
    functionName: 'getUserDineroVault',
    enabled: !!vaultAddress && !!underlying && isValidAddress,
    args: [vaultAddress, underlying, account || DEFAULT_ACCOUNT],
    onError: () =>
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Read,
        page: GAPage.DineroVault,
        functionName: 'getUserDineroVault',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Read,
        page: GAPage.DineroVault,
        functionName: 'getUserDineroVault',
      }),
  });
};

export const useDeposit = (data: VaultData, value: string) => {
  const [debouncedValue] = useDebounce(value, 500);

  const valueBN = safeToBigNumber(debouncedValue, data.depositTokenDecimals);

  const { config } = usePrepareContractWrite({
    addressOrName: data.vaultAddress,
    contractInterface: DineroVaultABI,
    args: [valueBN],
    functionName: 'deposit',
    enabled:
      !valueBN.isZero() &&
      !data.underlyingBalance.isZero() &&
      !data.underlyingAllowance.isZero() &&
      !data.maxDineroAmount.eq(data.mintedDineroAmount) &&
      data.underlyingBalance.gte(valueBN),
  });

  return useContractWrite(config);
};

export const useWithdraw = (data: VaultData, value: string) => {
  const [debouncedValue] = useDebounce(value, 500);

  const valueBN = safeToBigNumber(debouncedValue, data.depositTokenDecimals);

  const { config } = usePrepareContractWrite({
    addressOrName: data.vaultAddress,
    contractInterface: DineroVaultABI,
    args: [valueBN],
    functionName: 'withdraw',
    enabled:
      !valueBN.isZero() &&
      data.dineroBalance.gte(valueBN) &&
      valueBN.lte(data.depositAmount) &&
      !data.dineroBalance.isZero() &&
      !data.depositAmount.isZero(),
  });

  return useContractWrite(config);
};
