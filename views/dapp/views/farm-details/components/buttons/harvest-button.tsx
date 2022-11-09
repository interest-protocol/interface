import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC, useState } from 'react';
import { event } from 'react-ga';

import { GAAction, GACategory } from '@/constants/google-analytics';
import Button from '@/elements/button';
import { capitalize, showToast, showTXSuccessToast, throwError } from '@/utils';

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
      event({
        label: 'Error: Harvest - farm details harvest',
        action: GAAction.GENERIC,
        category: GACategory.Error,
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
    })
      .then(() =>
        event({
          label: 'Successful harvest',
          action: GAAction.ApproveTokenLP,
          category: GACategory.Operation,
        })
      )
      .catch(() =>
        event({
          label: 'Unsuccessful harvest',
          action: GAAction.ApproveTokenLP,
          category: GACategory.Operation,
        })
      );

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
