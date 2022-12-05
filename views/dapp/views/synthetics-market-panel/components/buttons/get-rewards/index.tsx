import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';

import Box from '@/elements/box';
import Button from '@/elements/button';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
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
import { useGetRewards } from '@/views/dapp/views/synthetics-market-panel/synthetics-market-panel.hooks';

import { GetRewardsProps } from './get-rewards.types';

const GetRewards: FC<GetRewardsProps> = ({ market, refetch }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const { writeAsync: getRewards } = useGetRewards(market);

  const disabled = market.pendingRewards.isZero() || !getRewards;

  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const tx = await getRewards?.();

      await tx?.wait(2);

      await refetch();
      await showTXSuccessToast(tx, market.chainId);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleGetRewards',
      });
    } catch (e: unknown) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleGetRewards',
      });
      throwContractCallError(e);
    } finally {
      setLoading(false);
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
        display="flex"
        variant="primary"
        justifyContent="center"
        alignItems="center"
        disabled={disabled}
        onClick={onGetRewards}
        bg={disabled ? 'disabled' : 'accent'}
      >
        {loading && (
          <Box as="span" display="inline-block" width="1rem" mr="0.5rem">
            <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
        )}
        {t('syntheticsMarketAddress.button.getRewards')}
      </Button>
    </Box>
  );
};

export default GetRewards;
