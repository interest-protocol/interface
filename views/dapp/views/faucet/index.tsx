import { FC } from 'react';

import { Container } from '@/components';
import { ETH_FAUCET_TOKENS } from '@/constants';
import { Box, Typography } from '@/elements';
import useLocalStorage from '@/hooks/use-storage';

import { IToken } from './faucet.types';
import FaucetForm from './faucet-form';

const Faucet: FC = () => {
  const [localTokens, setLocalTokens] = useLocalStorage<ReadonlyArray<IToken>>(
    'localTokens',
    []
  );

  return (
    <Box flex="1" display="flex" flexDirection="column">
      <Container
        dapp
        px="M"
        py="XXL"
        width="100%"
        background="specialBackground"
      >
        <Typography variant="normal" mt="S">
          Recommended tokens
        </Typography>
        <FaucetForm tokens={ETH_FAUCET_TOKENS} />
        <Typography variant="normal" mt="S">
          Local tokens
        </Typography>
        <FaucetForm local={{ setLocalTokens }} tokens={localTokens} />
      </Container>
    </Box>
  );
};

export default Faucet;
