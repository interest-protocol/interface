import { values } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { Switch } from '@/components';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, formatMoney } from '@/utils';

import Liquidity from '../liquidity';
import NonHasPool from '../non-has-pool';
import { PoolListProps } from './pool-list.types';

const PoolList: FC<PoolListProps> = ({ isLocal, pools }) => {
  const [isVolatile, setIsVolatile] = useState(true);

  return pools.length ? (
    <Box py="L" mb="L" px="L" bg="foreground" borderRadius="M">
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
        <Typography variant="normal" width="100%" my="L">
          {isLocal ? 'My' : 'Recommended'} Pools
        </Typography>
        <Switch
          defaultValue={isVolatile ? 'volatile' : 'stable'}
          options={[
            { value: 'volatile', onSelect: () => setIsVolatile(true) },
            { value: 'stable', onSelect: () => setIsVolatile(false) },
          ]}
        />
      </Box>
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
};

export default PoolList;
