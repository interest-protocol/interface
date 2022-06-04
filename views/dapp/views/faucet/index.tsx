import { BigNumber } from 'ethers';
import { o, prop } from 'ramda';
import { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@/components';
import { MAIL_FAUCET_TOKENS } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { useGetUserBalances } from '@/hooks';
import useLocalStorage from '@/hooks/use-storage';
import { getChainId } from '@/state/core/core.selectors';
import { flippedAppend } from '@/utils';

import GoBack from '../../components/go-back';
import ErrorView from '../error';
import CreateTokenForm from './create-token-form';
import { AddLocalToken, IToken, RemoveLocalToken } from './faucet.types';
import FaucetForm from './faucet-form';
import { processGetUserBalances } from './utilts';

const Faucet: FC = () => {
  const chainId = useSelector(getChainId) as number;
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [localTokens, setLocalTokens] = useLocalStorage<ReadonlyArray<IToken>>(
    `${chainId}-interest-protocol-faucet-tokens`,
    []
  );

  const toggleCreateToken = () => setIsCreatingToken((e) => !e);

  const MAIL_TOKENS = useMemo(
    () =>
      chainId && MAIL_FAUCET_TOKENS[chainId] ? MAIL_FAUCET_TOKENS[chainId] : [],
    [chainId]
  );

  const { error: recommendedError, data: recommendedData } = useGetUserBalances(
    MAIL_TOKENS.map(prop('address'))
  );
  const { error: localError, data: processedLocalData } = {
    error: undefined,
    data: localTokens.map((localToken) => ({
      ...localToken,
      balance: BigNumber.from((Math.random() * 1000 * 10 ** 18).toFixed(0)),
    })),
  };

  const processedRecommendedData = useMemo(
    () => processGetUserBalances(MAIL_TOKENS, recommendedData),
    [MAIL_TOKENS, recommendedData]
  );

  const addLocalToken: AddLocalToken = useCallback(
    o(setLocalTokens, flippedAppend(localTokens)),
    [localTokens]
  );
  const removeLocalToken: RemoveLocalToken = useCallback(
    (address: string) =>
      setLocalTokens(localTokens.filter((item) => item.address !== address)),
    [localTokens]
  );

  if (recommendedError || localError)
    return <ErrorView message="Error fetching contracts" />;

  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        <Container
          dapp
          px="M"
          py="XXL"
          width="100%"
          position="relative"
          background="specialBackground"
        >
          <Box
            textAlign={['center', 'center', 'center', 'left']}
            left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
            position={['static', 'static', 'absolute', 'static', 'absolute']}
          >
            <GoBack routeBack />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="normal">Recommended tokens</Typography>
            <Button variant="primary" onClick={toggleCreateToken}>
              Create Token
            </Button>
          </Box>
          <FaucetForm
            tokens={processedRecommendedData}
            isLoadingData={!recommendedData}
          />
          <Typography variant="normal">My tokens</Typography>
          <FaucetForm
            isLoadingData={false}
            tokens={processedLocalData}
            addLocalToken={addLocalToken}
            removeLocalToken={removeLocalToken}
          />
        </Container>
      </Box>
      <Modal
        background="#0004"
        modalProps={{
          shouldCloseOnEsc: true,
          isOpen: isCreatingToken,
          shouldCloseOnOverlayClick: true,
          onRequestClose: toggleCreateToken,
        }}
      >
        <CreateTokenForm
          addLocalToken={addLocalToken}
          handleClose={toggleCreateToken}
        />
      </Modal>
    </>
  );
};

export default Faucet;
