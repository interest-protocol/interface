import { FC, useState } from 'react';

import { Container, Tooltip } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../../components/go-back';
import DATA from '../vault/vault.helpers';
import VaultFarmBalance from './balance';
import ButtonTabSelect from './button-tab-select';
import VaultFarmDetails from './farm-details';
import VaultFarmPool from './farm-pool';
import VaultFarmTitle from './farm-title';
import { VaultFarmProps } from './vault-farm.types';

const VaultFarm: FC<VaultFarmProps> = ({ farm }) => {
  const [select, setSelect] = useState('stake');

  const dataFarm = farm ? DATA.filter((item) => item?.id == farm) : DATA;

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      width="100%"
      maxWidth="40rem"
      mx="auto"
    >
      <Container
        px="M"
        mt="XL"
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
              vaults={
                select === 'stake' ? [DATA[0], DATA[1]] : [DATA[1], DATA[0]]
              }
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultFarmDetails
              items={(select === 'stake' ? DATA[1] : DATA[0]).vaultDetails}
            />
            <VaultFarmBalance
              symbol={
                (select === 'stake' ? DATA[0] : DATA[1]).vault?.[0].symbol
              }
              address={
                (select === 'stake' ? DATA[0] : DATA[1]).vault?.[0].address
              }
              balance="149.43"
            />
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
        <Tooltip />
      </Container>
    </Box>
  );
};

export default VaultFarm;
