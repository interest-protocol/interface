import { ethers } from 'ethers';
import { propEq } from 'ramda';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';
import { isSameAddress } from '@/utils';

import { FaucetCurrencyDropdownProps, IToken } from '../faucet.types';

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

  const data = useMemo(
    () =>
      tokens.filter(
        ({ name, address, symbol }) =>
          name?.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) ||
          symbol?.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) ||
          (ethers.utils.isAddress(search) && isSameAddress(address, search))
      ),
    [search, tokens]
  );

  const handleSelectCurrency = (address: string) =>
    onSelectCurrency(address, () => {
      const token = data.find(propEq('address', address));
      if (token) addLocalToken?.(token);
    });

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
