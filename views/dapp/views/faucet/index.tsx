import { o } from 'ramda';
import { FC, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@/components';
import { MAIL_FAUCET_TOKENS } from '@/constants';
import { Box, Typography } from '@/elements';
import useLocalStorage from '@/hooks/use-storage';
import { getChainId } from '@/state/core/core.selectors';
import { flippedAppend } from '@/utils';

import { AddLocalToken, IToken } from './faucet.types';
import FaucetForm from './faucet-form';

const Faucet: FC = () => {
  const chainId = useSelector(getChainId) as number;

  const [localTokens, setLocalTokens] = useLocalStorage<ReadonlyArray<IToken>>(
    `${chainId}-interest-protocol-faucet-tokens`,
    []
  );

  const MAIL_TOKENS = useMemo(
    () =>
      chainId && MAIL_FAUCET_TOKENS[chainId] ? MAIL_FAUCET_TOKENS[chainId] : [],
    [chainId]
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
        <FaucetForm tokens={MAIL_TOKENS} />
        {/*<Typography variant="normal" mt="S">*/}
        {/*  Local tokens*/}
        {/*</Typography>*/}
        {/*<FaucetForm addLocalToken={addLocalToken} tokens={localTokens} />*/}
      </Container>
    </Box>
  );
};

export default Faucet;
