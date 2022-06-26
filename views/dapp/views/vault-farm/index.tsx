import { FC } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../../components/go-back';
import ZAP from '../vault/components/zap';
import VaultFarmBalance from './balance';
import Bounty from './bounty';
import ButtonTabSelect from './button-tab-select';
import VaultFarmDetails from './farm-details';
import VaultFarmPool from './farm-pool';
import VaultFarmTitle from './farm-title';

const VaultFarm: FC = () => {
  return (
    <Box flex="1" display="flex" flexDirection="column">
      <Container
        dapp
        px="M"
        mt="XL"
        width="100%"
        position="relative"
        background="specialBackground"
      >
        <Box display="flex" justifyContent="space-between">
          <GoBack route={RoutesEnum.Vault} />
        </Box>
        <Box mb="XL">
          <ButtonTabSelect />
          <Box
            bg="foreground"
            borderBottomLeftRadius="M"
            borderBottomRightRadius="M"
          >
            <Bounty />
            <VaultFarmTitle />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultFarmDetails />
            <VaultFarmBalance />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultFarmPool />
          </Box>
        </Box>
      </Container>
      <ZAP />
    </Box>
  );
};

export default VaultFarm;
