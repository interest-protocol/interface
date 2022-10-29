import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';

import Box from '@/elements/box';
import Button from '@/elements/button';
import {
  capitalize,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
} from '@/utils';

import { useGetRewards } from '../../synthetics-market.hooks';
import { GetRewardsProps } from './get-rewards.types';

const GetRewards: FC<GetRewardsProps> = ({ market }) => {
  const t = useTranslations();
  const { writeAsync: getRewards } = useGetRewards(market);

  const disabled = market.pendingRewards.isZero();

  const handleGetRewards = async () => {
    try {
      const tx = await getRewards?.();

      await tx?.wait(2);

      await showTXSuccessToast(tx, market.chainId);
    } catch (e: unknown) {
      throwContractCallError(e);
    }
  };

  const onGetRewards = () =>
    showToast(handleGetRewards(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });

  return (
    <Box p="XL" order={4} gridArea="g" bg="foreground" borderRadius="L">
      <Button
        width="100%"
        variant="primary"
        onClick={onGetRewards}
        disabled={disabled}
        bg={disabled ? 'disabled' : 'accent'}
      >
        {t('syntheticsMarketAddress.button.getRewards')}
      </Button>
    </Box>
  );
};

export default GetRewards;
