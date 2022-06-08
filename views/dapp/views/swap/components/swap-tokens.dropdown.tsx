import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';

import { IToken, SwapCurrencyDropdownProps } from '../swap.types';

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
  tokens: ReadonlyArray<IToken>,
  onSelectCurrency: (symbol: string) => void
): ReadonlyArray<IDropdownData> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return tokens
    ? tokens.map(({ address, symbol }) => {
        const SVG = TOKENS_SVG_MAP[symbol] ?? DefaultTokenSVG;

        console.log('>> Address ::: ', address);

        return {
          value: address,
          onSelect: () => onSelectCurrency(address),
          displayOption: symbol,
          displayTitle: (
            <Box
              mx="M"
              px="M"
              py="S"
              width="7.6rem"
              display="flex"
              borderRadius="M"
              alignItems="center"
              bg="bottomBackground"
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
        };
      })
    : [];
};

const SwapCurrencyDropdown: FC<SwapCurrencyDropdownProps> = ({
  Input,
  tokens,
  control,
  defaultValue,
  onSelectCurrency,
}) => {
  const search = useWatch({ control, name: 'search' });

  const searchResult = useMemo(
    () => BLOCKCHAIN_DATA.filter(({ address }) => search === address),
    [search]
  );

  console.log('>> default value ::: ', defaultValue);

  return (
    <Dropdown
      title=""
      relative
      mode="select"
      header={Input}
      defaultValue={defaultValue}
      emptyMessage="Not found Tokens"
      data={renderData(
        searchResult?.length ? searchResult : tokens,
        onSelectCurrency
      )}
    />
  );
};

export default SwapCurrencyDropdown;
