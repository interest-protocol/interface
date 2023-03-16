import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast } from '@/utils';

import { CreateTokenButtonProps } from './create-token-form.types';

const CreateTokenButton: FC<CreateTokenButtonProps> = ({
  control,
  handleCloseModal,
}) => {
  const name = useWatch({ control, name: 'name' });
  const symbol = useWatch({ control, name: 'symbol' });
  const amount = useWatch({ control, name: 'amount' });

  const [loading] = useState(false);
  const t = useTranslations();

  const isValid = useMemo(
    () => name && symbol && +amount > 0,
    [name, symbol, amount]
  );

  const safeCreateToken = () =>
    showToast(
      (async () => setTimeout(handleCloseModal, Math.random() * 2500))(),
      {
        loading: `${t('faucet.modalButton', { isLoading: 1 })}`,
        success: capitalize(t('common.success')),
        error: prop('message'),
      }
    );

  return (
    <Button
      mt="L"
      width="100%"
      variant="primary"
      onClick={safeCreateToken}
      disabled={loading || !isValid}
    >
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box as="span" display="inline-block" width="1rem">
            <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
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
