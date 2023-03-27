import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container, Switch } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box } from '@/elements';

const DEXViewWrapper: FC = ({ children }) => {
  const { pathname, push } = useRouter();

  const isSwap = !pathname.includes(Routes[RoutesEnum.DEXPool]);

  return (
    <Container width={['100%', '100%', '100%', 'auto']}>
      <Box
        bg="foreground"
        textAlign="center"
        mt="XL"
        p="L"
        borderRadius="L"
        minWidth={['20rem', '40rem']}
      >
        <Switch
          defaultValue={isSwap ? 'swap' : 'pool'}
          options={[
            { value: 'swap', onSelect: () => push(Routes[RoutesEnum.DEX]) },
            { value: 'pool', onSelect: () => push(Routes[RoutesEnum.DEXPool]) },
          ]}
        />
      </Box>
      {children}
    </Container>
  );
};

export default DEXViewWrapper;
