import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container, Switch } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box } from '@/elements';

import LiquidationView from './pool';
import Swap from './swap';

const DEXView: FC = () => {
  const { pathname, push } = useRouter();

  const isPool = pathname.includes(Routes[RoutesEnum.DEXPool]);

  return (
    <Container>
      <Box bg="foreground" textAlign="center" mt="XL" p="L" borderRadius="L">
        <Switch
          defaultValue={isPool ? 'pool' : 'swap'}
          options={[
            { value: 'swap', onSelect: () => push(Routes[RoutesEnum.DEX]) },
            { value: 'pool', onSelect: () => push(Routes[RoutesEnum.DEXPool]) },
          ]}
        />
      </Box>
      {!isPool ? <Swap /> : <LiquidationView />}
    </Container>
  );
};

export default DEXView;
