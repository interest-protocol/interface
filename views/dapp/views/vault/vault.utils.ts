import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { always, cond, equals, ifElse, isEmpty, not, o, prop, T } from 'ramda';
import { UseFormSetValue } from 'react-hook-form';

import { ISwitchOption } from '@/components/switch/switch.types';
import { VAULTS_RESPONSE_MAP, VaultTypes } from '@/constants/vaults';
import { TOKEN_SYMBOL, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import {
  isSameAddress,
  replaceWrappedNativeTokenWithNativeTokenSymbol,
} from '@/utils';

import { VaultTypeFilter } from './components/vault-filter-table/filter-table.types';
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

const searchOperation = cond([
  [isEmpty, always(T)],
  [
    T,
    (search: string) => {
      const parsedSearch = search.toLocaleLowerCase();
      return ({ depositTokenSymbol, depositTokenAddress }: VaultData) => {
        if (isAddress(search))
          return isSameAddress(search, depositTokenAddress);

        const vaultName = `${replaceWrappedNativeTokenWithNativeTokenSymbol(
          depositTokenSymbol
        )}`;

        return (
          vaultName.toLocaleLowerCase().includes(parsedSearch) ||
          vaultName
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z]/g, '')
            .includes(parsedSearch.replace(/[^a-zA-Z]/g, ''))
        );
      };
    },
  ],
]);

const typeOperation = cond([
  [equals(VaultTypeFilter.All), always(prop<string, boolean>('all'))],
  [equals(VaultTypeFilter.DV), always(o(not, prop<'all', boolean>('all')))],
  [T, always(T)],
]) as any;

const onlyDepositOperation = ifElse<
  any[],
  (x: VaultData) => boolean,
  (x: VaultData) => boolean
>(
  equals(true),
  always(({ depositAmount }) => !depositAmount.isZero()),
  always(T)
);

export const handleFilterVaults = (
  data: ReadonlyArray<VaultData>,
  search: string,
  type: VaultTypeFilter,
  onlyDeposit: boolean
): ReadonlyArray<VaultData> =>
  data
    ? data.filter((x) =>
        [
          typeOperation(!type),
          searchOperation(search.trim()),
          onlyDepositOperation(onlyDeposit),
        ].every((pred) => pred(x))
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
