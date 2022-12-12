import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  isZeroAddress,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useBurn } from '../../synthetics-market-panel.hooks';
import { isFormBurnEmpty } from '../../synthetics-market-panel.utils';
import { BurnButtonProps } from './buttons.types';

const BurnButton: FC<BurnButtonProps> = ({ data, form, refetch }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const burnSynt = useWatch({ control: form.control, name: 'burn.synt' });

  const burnCollateral = useWatch({
    control: form.control,
    name: 'burn.collateral',
  });

  const { writeAsync: burn } = useBurn(data, burnCollateral, burnSynt);

  const handleBurn = async () => {
    try {
      setLoading(true);
      const tx = await burn?.();

      await tx?.wait(2);

      await showTXSuccessToast(tx, data.chainId);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleBurn',
      });
      form.reset();
    } catch (e: unknown) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleBurn',
      });
      throwContractCallError(e);
    } finally {
      setLoading(false);
      await refetch();
    }
  };

  const onSubmitBurn = async () => {
    if (isFormBurnEmpty(form)) {
      toast.error(t('syntheticsMarketAddress.toastError'));
      return;
    }

    if (!data || !data.chainId || isZeroAddress(data.account)) return;

    await showToast(handleBurn(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  return (
    <Button
      display="flex"
      variant="primary"
      alignItems="center"
      disabled={loading || !burn}
      justifyContent="center"
      onClick={onSubmitBurn}
      hover={{ bg: !burn ? 'disabled' : 'accentActive' }}
      bg={!burn ? 'disabled' : loading ? 'accentActive' : 'accent'}
      cursor={loading || !burn ? 'not-allowed' : 'pointer'}
    >
      {loading && (
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
      )}
      <Typography
        as="span"
        fontSize="S"
        variant="normal"
        ml={loading ? 'L' : 'NONE'}
      >
        {t(
          !!+burnSynt && !!+burnCollateral
            ? 'syntheticsMarketAddress.button.removeCollateralBurn'
            : +burnCollateral
            ? 'syntheticsMarketAddress.button.removeCollateral'
            : 'syntheticsMarketAddress.button.burn'
        )}
      </Typography>
    </Button>
  );
};

export default BurnButton;
