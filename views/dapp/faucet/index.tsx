import { FC } from 'react';

import { Container, Tooltip } from '@/components';
import { FAUCET_TOKENS } from '@/constants';
import { Box, Typography } from '@/elements';

import GoBack from '../components/go-back';
import FaucetForm from './faucet-form';

const Faucet: FC = () => {
  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        <Container
          dapp
          px="M"
          width="100%"
          position="relative"
          py={['XL', 'XL', 'XL', 'XXL']}
        >
          <Box
            left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
            position={['static', 'static', 'absolute', 'static', 'absolute']}
          >
            <GoBack routeBack />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="normal" textTransform="capitalize">
              Tokens Recomendados
            </Typography>
          </Box>
          <FaucetForm
            tokens={FAUCET_TOKENS['DEVNET']}
            isLoadingData={!FAUCET_TOKENS['DEVNET'].length}
          />
        </Container>
      </Box>
      <Tooltip />
    </>
  );
};

export default Faucet;
