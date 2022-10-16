import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  extractCreateTokenEvent,
  isValidAccount,
  safeGetAddress,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';

import { useCreateToken } from './create-token-form.hooks';
import { CreateTokenButtonProps } from './create-token-form.types';

const CreateTokenButton: FC<CreateTokenButtonProps> = ({
  chainId,
  getValues,
  control,
  addLocalToken,
}) => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations();

  const { writeAsync: createToken } = useCreateToken(chainId, control);

  const handleCreateToken = async () => {
    try {
      setLoading(true);
      const [name, symbol] = [getValues('name'), getValues('symbol')];

      const tx = await createToken?.();

      await showTXSuccessToast(tx, chainId);

      if (tx) {
        const receipt = await tx.wait();

        const { token } = extractCreateTokenEvent(receipt);

        if (isValidAccount(token))
          addLocalToken({
            symbol,
            name,
            address: safeGetAddress(token),
          });
      }
    } catch (error) {
      throwError(t('error.generic'), error);
    } finally {
      setLoading(false);
    }
  };

  const safeCreateToken = () =>
    showToast(handleCreateToken(), {
      loading: `${t('faucet.modalButton', { isLoading: 1 })}`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  return (
    <Button
      mt="L"
      width="100%"
      variant="primary"
      disabled={loading || !createToken}
      onClick={safeCreateToken}
      hover={{ bg: 'accentAlternativeActive' }}
      bg={loading || !createToken ? 'disabled' : 'accentAlternative'}
      cursor={loading || !createToken ? 'not-allowed' : 'default'}
    >
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box as="span" display="inline-block" width="1rem">
            <LoadingSVG width="100%" />
          </Box>
          <Typography
            fontSize="S"
            variant="normal"
            ml="M"
            textTransform="capitalize"
          >
            {t('faucet.modalButton', { isLoading: 1 })}
          </Typography>
        </Box>
      ) : (
        t('faucet.modalButton', { isLoading: 0 })
      )}
    </Button>
  );
};

export default CreateTokenButton;
