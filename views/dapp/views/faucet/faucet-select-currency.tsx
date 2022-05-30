import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants/erc-20';
import { Box, Dropdown, Input, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';

import { FaucetSelectCurrencyProps } from './faucet.types';

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  label,
  local,
  tokens,
  defaultValue,
  onSelectCurrency,
}) => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

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
                  ChooseToken
                </Typography>
              </Box>
              <ArrowSVG width="0.5rem" />
            </Box>
          }
          header={local ? <Input /> : undefined}
          data={tokens.map(({ symbol }) => {
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
          })}
        />
      </Box>
    </Box>
  );
};

export default FaucetSelectCurrency;
