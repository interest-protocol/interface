import { FC } from 'react';

import { Container } from '@/components';
import { Box } from '@/elements';

import GoBack from '../../components/go-back';
import { DEXPoolDetailsViewProps } from './dex-pool-details.types';

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({ pairAddress }) => {
  console.log(pairAddress);

  return (
    <Container dapp mt="XXL" width="100%">
      <GoBack routeBack />
      <Box
        mt="XL"
        color="text"
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      ></Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
