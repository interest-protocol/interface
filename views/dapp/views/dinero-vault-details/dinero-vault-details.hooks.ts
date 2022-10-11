import { ethers } from 'ethers';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { DEFAULT_ACCOUNT, DV_VAULT_DETAILS_CALL_MAP } from '@/constants';
import { useSafeContractRead } from '@/hooks';
import DineroVaultABI from '@/sdk/abi/dinero-vault.abi.json';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import { getInterestViewEarnAddress, safeToBigNumber } from '@/utils';
import { DineroVaultData } from '@/views/dapp/views/dinero-vault-details/dinero-vault-details.types';

export const useGetUserDineroVault = (
  chainId: number,
  account: string | undefined,
  vaultAddress: string
) => {
  const underlying =
    DV_VAULT_DETAILS_CALL_MAP[chainId][ethers.utils.getAddress(vaultAddress)];

  return useSafeContractRead({
    addressOrName: getInterestViewEarnAddress(chainId),
    contractInterface: InterestViewEarnABI,
    functionName: 'getUserDineroVault',
    enabled: !!vaultAddress && !!underlying,
    args: [vaultAddress, underlying, account || DEFAULT_ACCOUNT],
  });
};

export const useDeposit = (data: DineroVaultData, value: string) => {
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

export const useWithdraw = (data: DineroVaultData, value: string) => {
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
