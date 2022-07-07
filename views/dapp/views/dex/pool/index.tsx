import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';

import AddLiquidity from './add-liquidity-modal';
import PoolList from './pool-list';

const Pool: FC = () => {
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
      <Box color="text" width="100%" minWidth={['100%', '40rem']}>
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
          <Button
            ml="XL"
            px="L"
            type="button"
            variant="primary"
            onClick={toggleModal}
            width={['auto', 'auto', 'auto', '10rem']}
          >
            Add Liquidity
          </Button>
        </Box>
        <PoolList isLocal pools={pools} />
        <PoolList pools={Array.from({ length: 5 })} />
      </Box>
      <AddLiquidity
        isOpen={!!modal && (modal as string) === 'add-liquidity'}
        handleClose={toggleModal}
      />
    </>
  );
};

export default Pool;
