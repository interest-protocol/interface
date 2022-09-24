import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { FixedPointMath, TOKEN_SYMBOL } from '@/sdk';
import { formatMoney } from '@/utils';

import { YourBalanceProps } from './your-balance.types';

const YourBalance: FC<YourBalanceProps> = ({
  isPair,
  loading,
  dnrBalance,
  intBalance,
  currencyIcons,
  collateralName,
  collateralBalance,
  collateralDecimals,
}) => {
  const t = useTranslations();
  return (
    <Box p="XL" order={3} gridArea="e" bg="foreground" borderRadius="L">
      <Typography variant="normal" textTransform="uppercase" mt="L">
        {t('common.yourBalance')}:
      </Typography>
      {loading ? (
        <Box my="XL" rowGap="0.7rem" display="grid" gridTemplateRows="1fr 1fr">
          <Skeleton wrapper={Box} />
          <Skeleton wrapper={Box} />
        </Box>
      ) : (
        [
          {
            name: 'Dinero',
            symbols: [
              {
                SVG: TOKENS_SVG_MAP[TOKEN_SYMBOL.DNR],
                highZIndex: false,
              },
            ],
            balance: dnrBalance,
          },
          {
            name: collateralName,
            symbols: currencyIcons,
            balance: collateralBalance,
            decimals: collateralDecimals,
          },
        ]
          .concat(
            isPair
              ? [
                  {
                    name: 'Interest',
                    symbols: [
                      {
                        SVG: TOKENS_SVG_MAP[TOKEN_SYMBOL.INT],
                        highZIndex: false,
                      },
                    ],
                    balance: intBalance,
                  },
                ]
              : []
          )
          .map(({ name, symbols, balance, decimals }) => (
            <Box
              my="L"
              key={v4()}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Box display="inline-flex">
                  {symbols.map(({ SVG, highZIndex }, index) => (
                    <Box
                      key={v4()}
                      width="1.6rem"
                      ml={index != 0 ? '-0.5rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" />
                    </Box>
                  ))}
                </Box>
                <Typography ml="M" variant="normal">
                  {name}
                </Typography>
              </Box>
              <Typography
                variant="normal"
                maxWidth="10rem"
                overflow="hidden"
                textAlign="right"
                whiteSpace="nowrap"
                color="textSecondary"
              >
                {formatMoney(FixedPointMath.toNumber(balance, decimals ?? 18))}
              </Typography>
            </Box>
          ))
      )}
    </Box>
  );
};

export default YourBalance;
