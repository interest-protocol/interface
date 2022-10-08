import { Result } from '@ethersproject/abi';
import { ethers } from 'ethers';
import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';
import { VAULTS_RESPONSE_MAP, VaultTypes } from '@/constants/vaults';
import { TOKEN_SYMBOL, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';

import { InterestViewEarn } from '../../../../types/ethers-contracts/InterestViewEarnAbi';
import { IVaultForm, ProcessVaultsSummaryData, VaultData } from './vault.types';

export const getFilterSwitchDefaultData = (
  values: ReadonlyArray<string>,
  setValue: UseFormSetValue<IVaultForm>,
  name: 'type' | 'onlyDeposit'
): [ISwitchOption, ISwitchOption] => [
  {
    value: values[0],
    onSelect: () => {
      setValue(name, false);
    },
  },
  {
    value: values[1],
    onSelect: () => {
      setValue(name, true);
    },
  },
];

export const handleFilterVaults = (
  data: ReadonlyArray<VaultData>,
  search: string,
  type: boolean,
  onlyDeposit: boolean
): ReadonlyArray<VaultData> =>
  search !== ''
    ? data.filter(
        (item) =>
          item.vault?.[0]?.symbol
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.vault?.[0]?.address
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.vault?.[0]?.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
      )
    : data;

const DEFAULT_VAULT_INFO = {
  vaultAddress: ZERO_ADDRESS,
  depositTokenSymbol: TOKEN_SYMBOL.Unknown as string,
  depositTokenAddress: ethers.constants.AddressZero,
  depositAmount: ZERO_BIG_NUMBER,
  depositTokenDecimals: 18,
  apr: null,
  earn: null,
  type: VaultTypes.DV,
  tvl: ZERO_BIG_NUMBER,
};

export const processVaultsSummaryData: ProcessVaultsSummaryData = (
  chainId,
  data
) => {
  const responseMap = VAULTS_RESPONSE_MAP[chainId];
  if (!data || !chainId || !responseMap)
    return {
      data: [DEFAULT_VAULT_INFO],
      loading: true,
    };

  return {
    data: data.map(({ tvl, depositAmount }, index) => ({
      tvl,
      depositAmount,
      ...VAULTS_RESPONSE_MAP[chainId].dineroVaults[index],
    })),
    loading: false,
  };
};
