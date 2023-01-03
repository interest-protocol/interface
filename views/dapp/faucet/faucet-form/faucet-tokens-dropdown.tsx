import { FC } from 'react';

import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { ArrowSVG, UnknownCoinSVG } from '@/svg';

import { FaucetCurrencyDropdownProps, IToken } from '../faucet.types';

const renderData = (
  data: ReadonlyArray<IToken>,
  onSelectCurrency: (address: string) => void
): ReadonlyArray<IDropdownData> =>
  data.map(({ symbol, address, Icon }) => {
    const SVG = Icon;

    return {
      onSelect: () => onSelectCurrency(address),
      displayOption: symbol,
      displayTitle: (
        <Box
          px="L"
          display="flex"
          bg="background"
          borderRadius="M"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box my="M" display="flex" alignItems="center">
            <Box as="span" display="inline-block" width="1rem">
              <SVG width="100%" maxHeight="1rem" maxWidth="1rem" />
            </Box>
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
          <Box as="span" display="inline-block" width="0.5rem">
            <ArrowSVG width="100%" maxHeight="0.5rem" maxWidth="0.5rem" />
          </Box>
        </Box>
      ),
      value: symbol,
    };
  });

const FaucetTokensDropdown: FC<FaucetCurrencyDropdownProps> = ({
  tokens,
  defaultValue,
  onSelectCurrency,
}) => {
  return (
    <Dropdown
      mode="select"
      defaultValue={defaultValue}
      emptyMessage="Nenhum token encontrado"
      title={
        <Box
          px="L"
          display="flex"
          bg="background"
          borderRadius="M"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box my="M" display="flex" alignItems="center">
            <Box as="span" display="inline-block" width="1rem">
              <UnknownCoinSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
            </Box>
            <Typography
              mx="M"
              as="span"
              variant="normal"
              hover={{ color: 'accent' }}
              active={{ color: 'accentActive' }}
              textTransform="capitalize"
            >
              ???
            </Typography>
          </Box>

          <Box as="span" display="inline-block" width="0.5rem">
            <ArrowSVG width="100%" maxHeight="0.5rem" maxWidth="0.5rem" />
          </Box>
        </Box>
      }
      data={renderData(tokens, onSelectCurrency)}
    />
  );
};

export default FaucetTokensDropdown;
