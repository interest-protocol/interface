import { values } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, formatMoney } from '@/utils';

import Liquidity from '../liquidity-item';
import NonHasPool from '../non-has-pool';
import { PoolListProps } from './pool-list.types';

const PoolList: FC<PoolListProps> = ({ isLocal, pools }) =>
  pools.length ? (
    <Box pb="L" pt="M" mb="L" px="L" bg="foreground" borderRadius="M">
      <Typography variant="normal" width="100%" my="L">
        {isLocal ? 'My' : 'Recommended'} Pools
      </Typography>
      {pools.length ? (
        pools.map(() => (
          <Liquidity
            key={v4()}
            amount={formatMoney(Math.random() * 89746)}
            amountUSD={formatDollars(Math.random() * 89746)}
            symbols={[
              values(TOKEN_SYMBOL)[
                ~~(Math.random() * values(TOKEN_SYMBOL).length)
              ],
              values(TOKEN_SYMBOL)[
                ~~(Math.random() * values(TOKEN_SYMBOL).length)
              ],
            ]}
          />
        ))
      ) : (
        <NonHasPool />
      )}
    </Box>
  ) : null;

export default PoolList;
