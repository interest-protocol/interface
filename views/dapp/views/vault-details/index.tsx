import { FC, useState } from 'react';

import { Container, Tooltip } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../../components/go-back';
import DATA from '../vault/vault.helpers';
import VaultDetailsBalance from './balance';
import ButtonTabSelect from './button-tab-select';
import VaultDetailsInfo from './details-info';
import VaultDetailsPool from './pool-details';
import { VaultDetailsProps } from './vault-details.types';
import VaultDetailsTitle from './vault-title';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VaultDetails: FC<VaultDetailsProps> = ({ vault }) => {
  const [select, setSelect] = useState('stake');

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      width={['100%', '100%', '35rem', '35rem']}
      mx="auto"
    >
      <Container
        dapp
        width="100%"
        mt="XL"
        px="M"
        position="relative"
        background="specialBackground"
      >
        <Box display="flex" justifyContent="space-between">
          <GoBack route={RoutesEnum.Vaults} />
        </Box>
        <Box mb="XL">
          <ButtonTabSelect state={select} setState={setSelect} />
          <Box
            bg="foreground"
            borderBottomLeftRadius="M"
            borderBottomRightRadius="M"
          >
            <VaultDetailsTitle
              vaults={
                select === 'stake' ? [DATA[1], DATA[0]] : [DATA[0], DATA[1]]
              }
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultDetailsInfo
              items={(select === 'stake' ? DATA[0] : DATA[1]).vaultDetails}
            />
            <VaultDetailsBalance
              symbol={
                (select === 'stake' ? DATA[1] : DATA[0]).vault?.[0].symbol
              }
              address={
                (select === 'stake' ? DATA[1] : DATA[0]).vault?.[0].address
              }
              balance="149.43"
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultDetailsPool
              VaultPoolDetails={[
                {
                  title: 'common.tvl',
                  content: (select === 'stake' ? DATA[1] : DATA[0])?.tvl,
                },
              ]}
            />
          </Box>
        </Box>
        <Tooltip />
      </Container>
    </Box>
  );
};

export default VaultDetails;
