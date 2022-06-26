import { FC } from 'react';

import { Box } from '@/elements';
import { InterestTokenSVG } from '@/svg';

import { VaultName } from '../vault/components';

const VaultFarmTitle: FC = () => (
  <Box p="1.5rem 2rem">
    <VaultName
      Icons={[InterestTokenSVG]}
      isAuto
      caption="BUNNY Dividend"
      name="BUNNY"
    />
  </Box>
);
export default VaultFarmTitle;
