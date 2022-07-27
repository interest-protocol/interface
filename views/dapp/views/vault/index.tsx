import { FC, useEffect, useState } from 'react';

import { Container } from '@/components';
import { Box } from '@/elements';
import { BitcoinSVG, InterestTokenSVG } from '@/svg';

import { VaultFilterTable, VaultHeader, VaultTable } from './components';
import ZAP from './components/zap';
import DATA from './vault.helpers';

const Vault: FC = () => {
  const [loading, setLoading] = useState(true);
  const [whoIsSelected, setWhoIsSelected] = useState('All');

  const DATAS = [
    {
      items: {
        vaultName: [[BitcoinSVG], false, 'BUNNY Dividend', 'BUNNY'],
        apy: '3.44%',
        earn: 'BNB',
        platform: 'Bunny',
        tvl: '$956,790.93',
      },
    },
    {
      items: {
        vaultName: [
          [InterestTokenSVG, BitcoinSVG],
          false,
          'BUNNY Dividend',
          'BUNNY',
        ],
        apy: '3.44%',
        earn: 'BNB',
        platform: 'Bunny',
        tvl: '$956,790.93',
      },
    },
    {
      items: {
        vaultName: [[InterestTokenSVG], false, 'BUNNY Dividend', 'BUNNY'],
        apy: '3.44%',
        earn: 'BNB',
        platform: 'Bunny',
        tvl: '$956,790.93',
      },
    },
  ];

  useEffect(() => {
    loading &&
      setTimeout(() => {
        setLoading(false);
      }, Math.floor(Math.random() * 3000));
  }, []);

  return (
    <Box
      height="100%"
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Container
        dapp
        py="XL"
        px="NONE"
        width="55%"
        display="flex"
        flexDirection="column"
        justifyContent={['center', 'flex-start']}
      >
        <VaultHeader size={DATAS.length} />
        <VaultFilterTable state={whoIsSelected} setState={setWhoIsSelected} />
        <Box width="100%">
          <VaultTable
            data={
              whoIsSelected == 'All'
                ? DATA
                : DATA.filter((item) => item.items.type == whoIsSelected)
            }
            loading={loading}
          />
        </Box>
      </Container>
      <ZAP />
    </Box>
  );
};

export default Vault;
