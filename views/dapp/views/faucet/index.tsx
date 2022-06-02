import { o } from 'ramda';
import { FC, useCallback } from 'react';

import { Container } from '@/components';
import { ETH_FAUCET_TOKENS } from '@/constants';
import { Box, Typography } from '@/elements';
import useLocalStorage from '@/hooks/use-storage';
import { flippedAppend } from '@/utils';

import { AddLocalToken, IToken } from './faucet.types';
import FaucetForm from './faucet-form';

const Faucet: FC = () => {
  const [localTokens, setLocalTokens] = useLocalStorage<ReadonlyArray<IToken>>(
    'interest-protocol-tokens',
    []
  );

  const addLocalToken: AddLocalToken = useCallback(
    o(setLocalTokens, flippedAppend(localTokens)),
    [localTokens]
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
        <FaucetForm local={{ addLocalToken }} tokens={localTokens} />
      </Container>
    </Box>
  );
};

export default Faucet;
