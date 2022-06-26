import { FC } from 'react';

import { Box } from '@/elements';

import VaultFarmDetailsItem from './farm-detail-item';

const VaultFarmDetails: FC = () => (
  <Box p="1.5rem 2rem">
    <VaultFarmDetailsItem title="APY / APR" content="3.22% / 3.17%" />
    <VaultFarmDetailsItem title="Staked" content="0.000" />
    <VaultFarmDetailsItem title="Profit" content="0.000 BNB" />
  </Box>
);

export default VaultFarmDetails;
