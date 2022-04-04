import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants/erc-20.data';
import { Box, Typography } from '@/elements';
import { formatMoney } from '@/utils';

import { YourBalanceProps } from './your-balance.types';

const YourBalance: FC<YourBalanceProps> = ({ loading, balances }) => (
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
      balances?.map((x) => {
        const SVG = TOKENS_SVG_MAP[x.currency.symbol];
        return (
          <Box my="L" key={v4()} display="flex" justifyContent="space-between">
            <Box display="flex">
              <SVG width="1rem" height="1rem" />
              <Typography ml="M" variant="normal">
                {x.currency.name}
              </Typography>
            </Box>
            <Typography
              variant="normal"
              textAlign="right"
              whiteSpace="nowrap"
              color="textSecondary"
            >
              {formatMoney(+x.toSignificant(6))}
            </Typography>
          </Box>
        );
      })
    )}
  </Box>
);

export default YourBalance;
