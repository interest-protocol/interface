import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC, useState } from 'react';

import { GAAction } from '@/constants/google-analytics';
import Button from '@/elements/button';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';
import { logException } from '@/utils/analytics';

import { useHarvest } from './buttons.hooks';
import { HarvestButtonProps } from './buttons.types';

const HarvestButton: FC<HarvestButtonProps> = ({ farm, refetch }) => {
  const t = useTranslations();
  const [loadingPool, setLoadingPool] = useState<boolean>(false);

  const { writeAsync: _harvest } = useHarvest(farm);

  const harvest = async () => {
    if (farm.pendingRewards.isZero()) return;
    setLoadingPool(true);

    try {
      const tx = await _harvest?.();

      if (tx) await tx.wait(2);
      await refetch();

      await showTXSuccessToast(tx, farm.chainId);
    } catch (e) {
      logException({
        action: GAAction.SubmitTransaction,
        label: 'Transaction Error: _harvest - HarvestButton',
        trackerName: [
          'views/dapp/views/farm-details/components/buttons/harvest-button.tsx',
        ],
      });
      throwError(t('error.generic'), e);
    } finally {
      setLoadingPool(false);
    }
  };

  const handleHarvest = () =>
    showToast(harvest(), {
      success: capitalize(t('common.success')),
      error: propOr(capitalize(t('common.error')), 'message'),
      loading: t('farmsDetails.thirdCardButton', { isLoading: 1 }),
    });

  return (
    <Button
      onClick={handleHarvest}
      variant="primary"
      disabled={farm.pendingRewards.isZero() || !_harvest}
      bg={!farm.pendingRewards.isZero() || !!_harvest ? 'success' : 'disabled'}
      cursor={
        !farm.pendingRewards.isZero() || !!_harvest ? 'pointer' : 'not-allowed'
      }
      hover={{
        bg:
          !farm.pendingRewards.isZero() || !!_harvest
            ? 'successActive'
            : 'disabled',
      }}
    >
      {t('farmsDetails.thirdCardButton', { isLoading: +loadingPool })}
    </Button>
  );
};

export default HarvestButton;
