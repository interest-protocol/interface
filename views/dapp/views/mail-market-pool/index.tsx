import { FC } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../../components/go-back';
import Web3Manager from '../../web3-manager';
import { MAILMarketPoolBalance, MAILMarketPoolTable } from './components';
import MAILMarketPoolInfo from './components/mail-market-pool-info';
import MAILMarketPoolNetApr from './components/mail-market-pool-net-apr';
import MAILMarketPoolRisk from './components/mail-market-pool-risk';
import { MAILMarketPoolProps } from './mail-market-pool.types';

const MAILMarketPool: FC<MAILMarketPoolProps> = ({ pool }) => (
  <Web3Manager>
    <Box flex="1" display="flex" flexDirection="column">
      <Container
        dapp
        large
        px="M"
        mt="XL"
        width="100%"
        position="relative"
        background="specialBackground"
      >
        <Box display="flex" justifyContent="space-between">
          <GoBack route={RoutesEnum.MAILMarket} />
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
          mt="XL"
          display="grid"
          gridGap="1rem"
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <MAILMarketPoolInfo pool={pool} />
          <Box
            display="grid"
            gridColumnGap="1rem"
            gridTemplateColumns="1fr 1fr"
          >
            <MAILMarketPoolBalance type="supply" balance="0928" />
            <MAILMarketPoolBalance type="borrow" balance="0928" />
          </Box>
          <MAILMarketPoolNetApr />
          <MAILMarketPoolRisk />
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
