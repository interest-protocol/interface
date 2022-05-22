import { FC } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../../components/go-back';
import Web3Manager from '../../web3-manager';
import { MAILMarketPoolTable } from './components';
import { MAILMarketPoolProps } from './mail-market-pool.types';

const MAILMarketPool: FC<MAILMarketPoolProps> = ({ pool }) => (
  <Web3Manager>
    <Box flex="1" display="flex" flexDirection="column">
      <Container
        dapp
        mt="XL"
        px="M"
        width="100%"
        position="relative"
        background="specialBackground"
      >
        <Box
          textAlign={['center', 'center', 'center', 'left']}
          left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
          position={['static', 'static', 'absolute', 'static', 'absolute']}
        >
          <GoBack route={RoutesEnum.MAILMarket} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="normal" ml="M">
            {pool} Pool
          </Typography>
          <a href="#popular">
            <Typography
              color="accent"
              variant="normal"
              display={['block', 'block', 'block', 'none']}
              hover={{
                color: 'accentActive',
              }}
            >
              See Popular
            </Typography>
          </a>
        </Box>
        <Box
          display="grid"
          columnGap="1rem"
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <MAILMarketPoolTable favorite type="supply" />
          <MAILMarketPoolTable favorite type="borrow" />
          <MAILMarketPoolTable type="supply" />
          <MAILMarketPoolTable type="borrow" />
        </Box>
      </Container>
    </Box>
  </Web3Manager>
);

export default MAILMarketPool;
