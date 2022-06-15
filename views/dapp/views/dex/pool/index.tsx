import { useRouter } from 'next/router';
import { values } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { Switch } from '@/components';
import { Box, Button, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, formatMoney } from '@/utils';

import Liquidity from './liquidity';
import AddLiquidity from './liquidity-pool-modal';
import NonHasPool from './non-has-pool';

const PoolView: FC = () => {
  const [isVolatile, setIsVolatile] = useState(true);

  const {
    pathname,
    query: { modal },
    push,
  } = useRouter();

  const toggleModal = () =>
    push(
      `${pathname}${
        !modal && modal !== 'add-liquidity' ? '?modal=add-liquidity' : ''
      }`
    );

  const pools = Array.from({ length: ~~(Math.random() * 5) });

  return (
    <>
      <Box color="text" width="100%" minWidth="40rem">
        <Box
          py="L"
          my="L"
          px="L"
          display="flex"
          bg="foreground"
          borderRadius="M"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="normal">Pools Overview</Typography>
          <Switch
            defaultValue={isVolatile ? 'volatile' : 'stable'}
            options={[
              { value: 'volatile', onSelect: () => setIsVolatile(true) },
              { value: 'stable', onSelect: () => setIsVolatile(false) },
            ]}
          />
          <Button
            px="L"
            type="button"
            width="10rem"
            variant="primary"
            onClick={toggleModal}
          >
            Add Liquidity
          </Button>
        </Box>
        <Box py="L" my="L" px="L" bg="foreground" borderRadius="M">
          <Typography variant="normal" width="100%" my="L">
            My Pools
          </Typography>
          {pools.length ? (
            pools.map(() => (
              <Liquidity
                key={v4()}
                hasWarning
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

        <Box py="L" my="L" px="L" bg="foreground" borderRadius="M">
          <Typography variant="normal" width="100%" my="L">
            Recommended Pools
          </Typography>
          {Array.from({ length: 5 }).map(() => (
            <Liquidity
              key={v4()}
              amount={formatMoney(Math.random() * 23345)}
              amountUSD={formatDollars(Math.random() * 89746)}
              hasWarning
              symbols={[
                values(TOKEN_SYMBOL)[
                  ~~(Math.random() * values(TOKEN_SYMBOL).length)
                ],
                values(TOKEN_SYMBOL)[
                  ~~(Math.random() * values(TOKEN_SYMBOL).length)
                ],
              ]}
            />
          ))}
        </Box>
      </Box>
      <AddLiquidity
        isOpen={!!modal && (modal as string) === 'add-liquidity'}
        handleClose={toggleModal}
      />
    </>
  );
};

export default PoolView;
