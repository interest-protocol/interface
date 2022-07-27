import { o, prop } from 'ramda';
import { FC, useCallback, useMemo, useState } from 'react';

import { Container } from '@/components';
import { FAUCET_TOKENS } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { useGetUserBalances, useIdAccount, useLocalStorage } from '@/hooks';
import { flippedAppend, isSameAddress } from '@/utils';

import GoBack from '../../components/go-back';
import ErrorView from '../error';
import CreateTokenForm from './create-token-form';
import { AddLocalToken, IToken, RemoveLocalToken } from './faucet.types';
import FaucetForm from './faucet-form';
import { processGetUserBalances } from './utilts';

const Faucet: FC = () => {
  const { chainId } = useIdAccount();
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [localTokens, setLocalTokens] = useLocalStorage<ReadonlyArray<IToken>>(
    `${chainId}-interest-protocol-faucet-tokens`,
    []
  );

  const toggleCreateToken = () => setIsCreatingToken((e) => !e);

  const TOKENS = useMemo(
    () => (chainId && FAUCET_TOKENS[chainId] ? FAUCET_TOKENS[chainId] : []),
    [chainId]
  );

  const { error, data } = useGetUserBalances(
    TOKENS.map(prop('address')).concat(localTokens.map(prop('address')))
  );

  const { recommendedData, localData } = useMemo(
    () => processGetUserBalances(TOKENS, localTokens, data),
    [TOKENS, data, localTokens]
  );

  const addLocalToken: AddLocalToken = useCallback(
    o(setLocalTokens, flippedAppend(localTokens)),
    [localTokens, setLocalTokens]
  );

  const removeLocalToken: RemoveLocalToken = useCallback(
    (address: string) =>
      setLocalTokens(
        localTokens.filter((item) => !isSameAddress(item.address, address))
      ),
    [localTokens, setLocalTokens]
  );

  if (error) return <ErrorView message="Error fetching balances" />;

  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        <Container
          dapp
          px="M"
          width="100%"
          position="relative"
          py={['XL', 'XL', 'XL', 'XXL']}
          background="specialBackground"
        >
          <Box
            left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
            position={['static', 'static', 'absolute', 'static', 'absolute']}
          >
            <GoBack routeBack />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="normal">Recommended tokens</Typography>
            <Button
              variant="primary"
              onClick={toggleCreateToken}
              hover={{ bg: 'accentActive' }}
            >
              Create Token
            </Button>
          </Box>
          <FaucetForm
            tokens={recommendedData}
            isLoadingData={!recommendedData.length}
          />
          <Typography variant="normal">My tokens</Typography>
          <FaucetForm
            isLoadingData={!recommendedData.length}
            tokens={localData}
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
