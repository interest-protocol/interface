import { FC } from 'react';

import { Container } from '@/components';
import { Typography } from '@/elements';

const VaultHeader: FC<{ size: string | number }> = ({ size }) => (
  <Container
    dapp
    py="XL"
    px="NONE"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent={['center', 'flex-start']}
  >
    <Typography variant="normal" fontWeight="bold">
      Vault ({size})
    </Typography>
  </Container>
);
export default VaultHeader;
