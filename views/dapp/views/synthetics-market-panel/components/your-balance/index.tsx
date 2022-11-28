import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { formatMoney } from '@/utils';

import { YourBalanceProps } from './your-balance.types';

const YourBalance: FC<YourBalanceProps> = ({ data }) => {
  const t = useTranslations();

  return (
    <Box p="XL" order={3} gridArea="e" bg="foreground" borderRadius="L">
      <Typography variant="normal" textTransform="uppercase" mt="L">
        {t('common.yourBalance')}:
      </Typography>
      <Box>
        {[
          {
            name: data.syntSymbol,
            symbols: [
              {
                SVG: TOKENS_SVG_MAP[data.chainId][data.syntAddress],
                highZIndex: false,
              },
            ],
            balance: data.syntBalance,
          },
          {
            name: data.collateralSymbol,
            symbols: [
              {
                SVG: TOKENS_SVG_MAP[data.chainId][data.collateralAddress],
                highZIndex: false,
              },
            ],
            balance: data.adjustedCollateralBalance,
          },
        ].map(({ name, symbols, balance }) => (
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
                    <SVG width="100%" maxHeight="1.6rem" maxWidth="1.6rem" />
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
              {formatMoney(FixedPointMath.toNumber(balance))}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default YourBalance;
