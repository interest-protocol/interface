import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { formatMoney } from '@/utils';

import { YourBalanceProps } from './your-balance.types';

const YourBalance: FC<YourBalanceProps> = ({ loading, dineroPair }) => (
  <Box
    py="XL"
    order={3}
    gridArea="e"
    bg="foreground"
    borderRadius="L"
    px={['XL', 'XXL']}
  >
    <Typography variant="normal" textTransform="uppercase" mt="L">
      Your balance:
    </Typography>
    {loading ? (
      <Box my="XL" rowGap="0.7rem" display="grid" gridTemplateRows="1fr 1fr">
        <Skeleton wrapper={Box} />
        <Skeleton wrapper={Box} />
      </Box>
    ) : (
      dineroPair?.toArray().map((x) => {
        const erc20 = x.currencyAmount.currency;
        const SVG = TOKENS_SVG_MAP[erc20.symbol];

        return (
          <Box my="L" key={v4()} display="flex" justifyContent="space-between">
            <Box display="flex">
              <SVG width="1rem" height="1rem" />
              <Typography ml="M" variant="normal">
                {erc20.name}
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
              {formatMoney(+x.currencyAmount.toSignificant(6))}
            </Typography>
          </Box>
        );
      })
    )}
  </Box>
);

export default YourBalance;
