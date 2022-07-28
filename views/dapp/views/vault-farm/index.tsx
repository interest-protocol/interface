import { FC, useState } from 'react';

import { Container } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../../components/go-back';
import ZAP from '../vault/components/zap';
import DATA from '../vault/vault.helpers';
import VaultFarmBalance from './balance';
import ButtonTabSelect from './button-tab-select';
import VaultFarmDetails from './farm-details';
import VaultFarmPool from './farm-pool';
import VaultFarmTitle from './farm-title';
import { VaultFarmProps } from './vault-farm.types';

const VaultFarm: FC<VaultFarmProps> = ({ farm }) => {
  const [select, setSelect] = useState('Stable');

  const dataFarm = farm ? DATA.filter((item) => item?.id == farm) : DATA;

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      width={['80%', '80%', '80%', '100%']}
      mx="auto"
    >
      <Container
        dapp
        px="M"
        mt="XL"
        width={['100%', '100%', '100%', '50%']}
        position="relative"
        background="specialBackground"
      >
        <Box display="flex" justifyContent="space-between">
          <GoBack route={RoutesEnum.Vault} />
        </Box>
        <Box mb="XL">
          <ButtonTabSelect state={select} setState={setSelect} />
          <Box
            bg="foreground"
            borderBottomLeftRadius="M"
            borderBottomRightRadius="M"
          >
            <VaultFarmTitle
              vault={dataFarm?.[0]?.vault}
              isAuto={dataFarm?.[0]?.isAuto}
              caption={dataFarm?.[0]?.caption}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultFarmDetails items={dataFarm?.[0]?.vaultDetails} />
            <VaultFarmBalance header={select} />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultFarmPool
              VaultPoolDetails={[
                { title: 'Earn', content: dataFarm?.[0]?.earn },
                { title: 'Type', content: dataFarm?.[0]?.type },
                { title: 'TVL', content: dataFarm?.[0]?.tvl },
              ]}
            />
          </Box>
        </Box>
      </Container>
      <ZAP />
    </Box>
  );
};

export default VaultFarm;
