import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';

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
  tokens: ReadonlyArray<IToken>,
  onSelectCurrency: (symbol: string) => void,
  search: string
): ReadonlyArray<IDropdownData> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return tokens
    .filter(({ address }) => address.includes(search))
    .map(({ symbol }) => {
      const SVG = TOKENS_SVG_MAP[symbol] ?? DefaultTokenSVG;
      return {
        onSelect: () => onSelectCurrency(symbol),
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
};

const FaucetTokensDropdown: FC<FaucetCurrencyDropdownProps> = ({
  Input,
  local,
  tokens,
  control,
  defaultValue,
  onSelectCurrency,
}) => {
  const search = useWatch({ control, name: 'search' });

  const searchResult = useMemo(() => {
    // handleLoading(true);

    // const timeout: NodeJS.Timeout = setTimeout(() => {
    //   handleLoading(false);
    //   clearTimeout(timeout);
    // }, Math.random() * 4000);

    return BLOCKCHAIN_DATA.filter(({ address }) => search === address);
  }, [search]);

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
      header={local ? Input : undefined}
      data={renderData(
        searchResult?.length ? searchResult : tokens,
        onSelectCurrency,
        search
      )}
    />
  );
};

export default FaucetTokensDropdown;