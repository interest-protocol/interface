import { isAddress } from 'ethers/lib/utils';
import { propEq } from 'ramda';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';
import { isSameAddress } from '@/utils';

import { FaucetCurrencyDropdownProps, IToken } from './faucet.types';

const BLOCKCHAIN_DATA = [
  {
    name: 'Interest Protocol',
    symbol: 'INT',
    address: '0x3FB23255BcC69cC9eC9dCa611ff872991B993C6C',
  },
  {
    name: 'Binance Main Net',
    symbol: 'BNB',
    address:
      '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
  },
];

const renderData = (
  data: ReadonlyArray<IToken>,
  onSelectCurrency: (address: string) => void
): ReadonlyArray<IDropdownData> =>
  data.map(({ symbol, address }) => {
    const SVG = TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

    return {
      onSelect: () => onSelectCurrency(address),
      displayOption: symbol,
      displayTitle: (
        <Box
          py="M"
          px="L"
          display="flex"
          bg="background"
          borderRadius="M"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box my="M" display="flex" alignItems="center">
            <SVG width="1rem" height="1rem" />
            <Typography
              mx="M"
              as="span"
              variant="normal"
              hover={{ color: 'accent' }}
              active={{ color: 'accentActive' }}
            >
              {symbol}
            </Typography>
          </Box>
          <ArrowSVG width="0.5rem" />
        </Box>
      ),
      value: symbol,
    };
  });

const FaucetTokensDropdown: FC<FaucetCurrencyDropdownProps> = ({
  Input,
  tokens,
  control,
  defaultValue,
  addLocalToken,
  onSelectCurrency,
}) => {
  const search = useWatch({ control, name: 'search' });

  const { data, isLocal } = useMemo(() => {
    const data = tokens.filter(
      ({ name, address, symbol }) =>
        name?.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) ||
        symbol?.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) ||
        isSameAddress(address, search)
    );
    return data.length
      ? { data, isLocal: true }
      : {
          // TODO: get token from blockchain,
          data: BLOCKCHAIN_DATA.filter(
            ({ address }) => isAddress(search) && address == search
          ),
          isLocal: false,
        };
  }, [search]);

  const handleSelectCurrency = (address: string) =>
    onSelectCurrency(
      address,
      !isLocal
        ? () => {
            const token = data.find(propEq('address', address));
            if (token) addLocalToken?.(token);
          }
        : undefined
    );

  return (
    <Dropdown
      relative
      mode="select"
      defaultValue={defaultValue}
      emptyMessage="Not found Tokens"
      title={
        <Box
          py="M"
          px="L"
          display="flex"
          bg="background"
          borderRadius="M"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box my="M" display="flex" alignItems="center">
            <Typography
              mx="M"
              as="span"
              variant="normal"
              hover={{ color: 'accent' }}
              active={{ color: 'accentActive' }}
            >
              Select a Token
            </Typography>
          </Box>
          <ArrowSVG width="0.5rem" />
        </Box>
      }
      header={addLocalToken ? Input : undefined}
      data={renderData(data, handleSelectCurrency)}
    />
  );
};

export default FaucetTokensDropdown;
