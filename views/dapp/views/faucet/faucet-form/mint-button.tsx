import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { useCallback } from 'react';
import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  isValidAccount,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useMint } from './faucet-form.hooks';
import { MintButtonProps } from './faucet-form.types';

const MintButton: FC<MintButtonProps> = ({
  control,
  chainId,
  account,
  getValues,
  refetch,
  loadingState,
}) => {
  const t = useTranslations();

  const {
    useContractWriteReturn: { writeAsync: mint },
  } = useMint(chainId, account, control);

  const handleOnMint = useCallback(async () => {
    try {
      loadingState.setLoading(true);

      const amount = getValues('amount');
      const token = getValues('token');

      if (!amount || !isValidAccount(token))
        throwError(capitalize(t('common.error')));

      const tx = await mint?.();

      await showTXSuccessToast(tx, chainId);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.Faucet,
        functionName: 'handleOnMint',
      });
      await refetch();
    } catch (error) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.Faucet,
        functionName: 'handleOnMint',
      });
      throwError(t('error.generic'), error);
    } finally {
      loadingState.setLoading(false);
    }
  }, [chainId, account, mint]);

  const onMint = () =>
    showToast(handleOnMint(), {
      loading: `${t('faucet.button', { isLoading: 1 })}`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  return (
    <Button
      width="100%"
      onClick={onMint}
      variant="primary"
      disabled={loadingState.loading || !mint}
      cursor={loadingState.loading || !mint ? 'not-allowed' : 'pointer'}
      hover={{ bg: 'accentAlternativeActive' }}
      bg={
        loadingState.loading
          ? 'accentAlternativeActive'
          : !mint
          ? 'disabled'
          : 'accentAlternative'
      }
    >
      {loadingState.loading ? (
        <Box as="span" display="flex" justifyContent="center">
          <Box as="span" display="inline-block" width="1rem">
            <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
          <Typography
            as="span"
            variant="normal"
            ml="M"
            fontSize="S"
            textTransform="capitalize"
          >
            {t('faucet.button', { isLoading: 1 })}
          </Typography>
        </Box>
      ) : (
        t('faucet.button', { isLoading: 0 })
      )}
    </Button>
  );
};

export default MintButton;
