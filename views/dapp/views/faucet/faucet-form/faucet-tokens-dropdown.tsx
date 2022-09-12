import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';
import { capitalize } from '@/utils';

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
            <Box as="span" display="inline-block" width="1rem">
              <SVG width="100%" />
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
            <ArrowSVG width="100%" />
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
  const t = useTranslations();
  return (
    <Dropdown
      relative
      mode="select"
      defaultValue={defaultValue}
      emptyMessage={capitalize(t('faucet.notFoundToken'))}
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
              textTransform="capitalize"
            >
              {t('faucet.select')}
            </Typography>
          </Box>

          <Box as="span" display="inline-block" width="0.5rem">
            <ArrowSVG width="100%" />
          </Box>
        </Box>
      }
      data={renderData(tokens, onSelectCurrency)}
    />
  );
};

export default FaucetTokensDropdown;
