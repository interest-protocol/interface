import { FC, useEffect, useState } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../../components/go-back';
import { MAILMarketPoolBalance, MAILMarketPoolTable } from './components';
import MAILMarketPoolInfo from './components/mail-market-pool-info';
import MAILMarketPoolNetApr from './components/mail-market-pool-net-apr';
import MAILMarketPoolRisk from './components/mail-market-pool-risk';
import { MAILMarketPoolProps } from './mail-market-pool.types';

const MAILMarketPool: FC<MAILMarketPoolProps> = ({ pool }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading &&
      setTimeout(() => {
        setLoading(!loading);
      }, 6000);
  }, []);

  return (
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
            <MAILMarketPoolBalance
              type="supply"
              balance="0928"
              loading={loading}
            />
            <MAILMarketPoolBalance
              type="borrow"
              balance="0928"
              loading={loading}
            />
          </Box>
          <MAILMarketPoolNetApr loading={loading} />
          <MAILMarketPoolRisk loading={loading} />
        </Box>
        <Box
          display="grid"
          columnGap="1rem"
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <MAILMarketPoolTable loading={loading} favorite type="supply" />
          <MAILMarketPoolTable loading={loading} favorite type="borrow" />
          <MAILMarketPoolTable loading={loading} type="supply" />
          <MAILMarketPoolTable loading={loading} type="borrow" />
        </Box>
      </Container>
    </Box>
  );
};
export default MAILMarketPool;
