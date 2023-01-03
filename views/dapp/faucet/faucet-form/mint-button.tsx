import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { useCallback, useState } from 'react';
import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, showToast } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { MintButtonProps } from './faucet-form.types';

const MintButton: FC<MintButtonProps> = ({ getValues }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  console.log(getValues);

  const handleOnMint = useCallback(async () => {
    try {
      setLoading(true);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.Faucet,
        functionName: 'handleOnMint',
      });
    } catch (error) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.Faucet,
        functionName: 'handleOnMint',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const onMint = () =>
    showToast(handleOnMint(), {
      loading: `Loading`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  return (
    <Button
      width="100%"
      onClick={onMint}
      variant="primary"
      disabled={loading}
      hover={{ bg: 'accentAlternativeActive' }}
      bg={!loading ? 'accentAlternativeActive' : 'disabled'}
      cursor={loading ? 'not-allowed' : 'pointer'}
      color="textSecondary"
    >
      {loading ? (
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
            Minting
          </Typography>
        </Box>
      ) : (
        'Mint'
      )}
    </Button>
  );
};

export default MintButton;
