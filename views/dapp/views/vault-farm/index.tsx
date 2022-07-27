import { FC, SVGAttributes, useState } from 'react';

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
  const [select, setSelect] = useState('Version 1');

  const dataFarm = farm ? DATA.filter((item) => item?.items?.id == farm) : DATA;

  const DETAILS_FARMS = [
    { title: 'APR', content: '33%', version: ['Version 1'] },
    {
      title: 'Deposit',
      content: '0.0',
      version: ['Version 1', 'Version 2'],
    },
    {
      title: 'Position',
      content: '2º',
      version: ['Version 1'],
    },
    {
      title: 'Profit',
      content: '0.0',
      version: ['Version 1'],
    },
  ];
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
              Icons={
                dataFarm?.[0]?.items?.vaultName[0] as FC<
                  SVGAttributes<SVGSVGElement>
                >[]
              }
              isAuto={dataFarm?.[0]?.items?.vaultName[1] as boolean}
              caption={dataFarm?.[0]?.items?.vaultName[2] as string}
              name={dataFarm?.[0]?.items?.vaultName[3] as string}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultFarmDetails version={select} items={DETAILS_FARMS} />
            <VaultFarmBalance version={select} />
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
