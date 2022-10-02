import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { useChainId } from '@/hooks';
import { ArrowSVG } from '@/svg';

import { FaucetCurrencyDropdownProps, IToken } from '../faucet.types';

const renderData = (
  data: ReadonlyArray<IToken>,
  onSelectCurrency: (address: string) => void,
  chainId: number
): ReadonlyArray<IDropdownData> =>
  data.map(({ symbol, address }) => {
    const SVG =
      TOKENS_SVG_MAP[chainId][address] ?? TOKENS_SVG_MAP[chainId].default;

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
  const chainId = useChainId();

  return (
    <Dropdown
      relative
      mode="select"
      defaultValue={defaultValue}
      emptyMessage={t('faucet.notFoundToken')}
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
      data={renderData(tokens, onSelectCurrency, chainId)}
    />
  );
};

export default FaucetTokensDropdown;
