import { useTranslations } from 'next-intl';
import { o, prop } from 'ramda';
import { FC, useCallback, useMemo } from 'react';

import { Container } from '@/components';
import { FAUCET_TOKENS } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { useGetUserBalances, useIdAccount, useLocalStorage } from '@/hooks';
import { flippedAppend, isSameAddress } from '@/utils';
import { GAPage, logGenericEvent } from '@/utils/analytics';

import GoBack from '../../components/go-back';
import ErrorView from '../error';
import CreateTokenForm from './create-token-form';
import {
  AddLocalToken,
  FaucetProps,
  IToken,
  RemoveLocalToken,
} from './faucet.types';
import FaucetForm from './faucet-form';
import { processGetUserBalances } from './utilts';

const Faucet: FC<FaucetProps> = ({
  formFaucet,
  formLocalFaucet,
  isCreatingTokenState,
}) => {
  const t = useTranslations();
  const { chainId, account } = useIdAccount();

  const [localTokens, setLocalTokens] = useLocalStorage<ReadonlyArray<IToken>>(
    `${chainId}-interest-protocol-faucet-tokens`,
    []
  );
  const toggleCreateToken = () =>
    isCreatingTokenState.setIsCreatingToken((e) => !e);

  const TOKENS = useMemo(
    () => (chainId && FAUCET_TOKENS[chainId] ? FAUCET_TOKENS[chainId] : []),
    [chainId]
  );

  const { error, data, refetch } = useGetUserBalances(
    TOKENS.map(prop('address')).concat(localTokens.map(prop('address'))),
    GAPage.Faucet
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

  if (error) return <ErrorView message={t('error.fetchingBalances')} />;

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
              {t('faucet.firstSectionTitle')}
            </Typography>
            <Button
              variant="primary"
              onClick={() => {
                toggleCreateToken();
                logGenericEvent(`Modal_Faucet_CreateNewToken`);
              }}
              hover={{ bg: 'accentActive' }}
            >
              {t('faucet.modalButton', { isLoading: 0 })}
            </Button>
          </Box>
          <FaucetForm
            tokens={recommendedData}
            isLoadingData={!recommendedData.length}
            refetch={async () => {
              await refetch();
            }}
            formFaucet={formFaucet}
            chainId={chainId}
            account={account}
          />
          {localData.length != 0 && (
            <>
              <Typography variant="normal" textTransform="capitalize">
                {t('faucet.secondSectionTitle')}
              </Typography>
              <FaucetForm
                isLoadingData={!recommendedData.length}
                tokens={localData}
                removeLocalToken={removeLocalToken}
                refetch={async () => {
                  await refetch();
                }}
                formFaucet={formLocalFaucet}
                chainId={chainId}
                account={account}
              />
            </>
          )}
        </Container>
      </Box>
      <Modal
        background="#0004"
        modalProps={{
          shouldCloseOnEsc: true,
          isOpen: isCreatingTokenState.isCreatingToken,
          shouldCloseOnOverlayClick: true,
          onRequestClose: toggleCreateToken,
        }}
      >
        <CreateTokenForm
          addLocalToken={addLocalToken}
          handleClose={toggleCreateToken}
          handleCloseModal={toggleCreateToken}
        />
      </Modal>
    </>
  );
};

export default Faucet;
