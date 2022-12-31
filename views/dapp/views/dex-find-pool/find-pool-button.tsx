import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';

import { Box, Button } from '@/elements';
import { capitalize, isSameAddressZ, showToast, throwError } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';
import { WalletGuardButton } from '@/views/dapp/components';
import CreatePoolPopup from '@/views/dapp/views/dex-find-pool/create-pool-popup';

import { FindPoolButtonProps } from './dex-find-pool.types';

const FindPoolButton: FC<FindPoolButtonProps> = ({
  getValues,
  tokenBAddress,
  tokenAAddress,
  isStable,
  isCreatingPair,
  setCreatingPair,
}) => {
  const [loading, setLoading] = useState(false);
  const [createPoolPopup, setCreatePoolPopup] = useState(false);
  const t = useTranslations();

  const enterPool = async () => {
    setLoading(true);

    try {
      setLoading(false);

      setCreatingPair(true);
    } catch {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexFindPool,
        functionName: 'enterPool',
      });
      throwError('Error connecting');
      setLoading(false);
    }
  };

  const handleEnterPool = () =>
    showToast(enterPool(), {
      loading: capitalize(t('common.check', { isLoading: 1 })),
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const createPair = async () => {
    try {
      setLoading(true);
      setCreatePoolPopup(false);

      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexFindPool,
        functionName: 'createPair',
      });
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexFindPool,
        functionName: 'createPair',
      });
      throwError(t('error.generic'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePair = () =>
    showToast(createPair(), {
      loading: t('dexPoolFind.buttonPool', { isLoading: 1 }),
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const handleValidateCreatePair = async () => {
    return setCreatePoolPopup(true);
  };

  return (
    <Box
      p="L"
      my="L"
      color="text"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
      width={['100%', '100%', '100%', '30rem']}
    >
      <WalletGuardButton>
        {isSameAddressZ(tokenAAddress, tokenBAddress) ? (
          <Button width="100%" variant="primary" disabled={true} bg="disabled">
            {t('dexPoolFind.buttonSameToken')}
          </Button>
        ) : isCreatingPair ? (
          <Button
            width="100%"
            variant="primary"
            disabled={loading}
            bg={loading ? 'accentActive' : 'accent'}
            hover={{
              bg: loading ? 'disabled' : 'accentActive',
            }}
            onClick={loading ? undefined : handleValidateCreatePair}
          >
            {t('dexPoolFind.buttonPool', { isLoading: Number(loading) })}
          </Button>
        ) : (
          <Button
            width="100%"
            variant="primary"
            disabled={loading}
            onClick={handleEnterPool}
            bg={loading ? 'accentActive' : 'accent'}
            hover={{ bg: loading ? 'disabled' : 'accentActive' }}
          >
            {t('dexPoolFind.button', { isLoading: Number(loading) })}
          </Button>
        )}
      </WalletGuardButton>
      <CreatePoolPopup
        isStable={isStable}
        isOpen={createPoolPopup}
        symbol0={getValues('tokenA.symbol')}
        symbol1={getValues('tokenB.symbol')}
        onCancel={() => setCreatePoolPopup(false)}
        onContinue={handleCreatePair}
      />
    </Box>
  );
};

export default FindPoolButton;
