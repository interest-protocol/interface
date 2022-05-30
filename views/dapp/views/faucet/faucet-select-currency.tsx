import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants/erc-20';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';

import { FaucetSelectCurrencyProps, IToken } from './faucet.types';
import FaucetSearchToken from './faucet-search-token';

const renderData = (
  tokens: ReadonlyArray<IToken>,
  onSelectCurrency: (symbol: string) => void
): ReadonlyArray<IDropdownData> => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return tokens.map(({ symbol }) => {
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

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  label,
  local,
  tokens,
  defaultValue,
  onSelectCurrency,
}) => {
  const { register } = useForm({
    defaultValues: {
      search: '',
    },
    mode: 'onBlur',
  });

  return (
    <Box my="M">
      <Typography
        as="label"
        fontSize="S"
        variant="normal"
        display="inline-block"
      >
        {label}:
      </Typography>
      <Box my="M" display="flex" flexDirection="column" alignItems="stretch">
        <Dropdown
          relative
          mode="select"
          defaultValue={defaultValue}
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
          header={local ? <FaucetSearchToken register={register} /> : undefined}
          data={renderData(tokens, onSelectCurrency)}
        />
      </Box>
    </Box>
  );
};

export default FaucetSelectCurrency;
