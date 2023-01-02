import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';

import { Box, Button } from '@/elements';
import { capitalize, showToast, throwError } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';
import { WalletGuardButton } from '@/views/dapp/components';

import ApproveButton from './approve-button';
import LinearLoader from './linear-loader';
import RemoveLiquidityButton from './remove-liquidity-button';
import { RemoveLiquidityCardContentProps } from './remove-liquidity-card.types';
import TokenAmount from './token-amount';

const RemoveLiquidityCardContent: FC<RemoveLiquidityCardContentProps> = ({
  tokens,
  lpAllowance,
  isFetchingInitialData,
  refetch,
  setValue,
  control,
}) => {
  const t = useTranslations();

  const approveToken = async () => {
    try {
      setValue('loading', true);
    } catch {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexPoolDetailsRemoveLiquidity,
        functionName: 'approveToken',
      });
      throwError(t('error.generic'));
    } finally {
      setValue('loading', false);
      await refetch();
    }
  };

  const handleApproveToken = () =>
    showToast(approveToken(), {
      loading: `${capitalize(t('common.approve', { isLoading: 1 }))}`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const remove = async () => {
    try {
      setValue('removeLoading', true);

      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexPoolDetailsRemoveLiquidity,
        functionName: 'remove',
      });
    } catch {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexPoolDetailsRemoveLiquidity,
        functionName: 'remove',
      });
      throwError(t('error.generic'));
    } finally {
      setValue('removeLoading', false);
      await refetch();
    }
  };

  const handleRemoveLiquidity = async () =>
    showToast(remove(), {
      loading: capitalize(`${t('common.remove', { isLoading: 1 })}`),
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  return (
    <>
      <LinearLoader control={control} />
      <Box
        my="L"
        rowGap="1rem"
        display="grid"
        gridTemplateColumns="auto auto 1fr"
      >
        <TokenAmount
          Icon={tokens[0].Icon}
          symbol={tokens[0].symbol}
          control={control}
          name="token0Amount"
          isFetchingInitialData={isFetchingInitialData}
        />
        <TokenAmount
          Icon={tokens[1].Icon}
          symbol={tokens[1].symbol}
          control={control}
          name="token1Amount"
          isFetchingInitialData={isFetchingInitialData}
        />
      </Box>
      <WalletGuardButton>
        <Box
          mt="L"
          display="grid"
          gridColumnGap="1rem"
          gridTemplateColumns={lpAllowance.isZero() ? '1fr' : '1fr 1fr'}
        >
          {lpAllowance.isZero() ? (
            <ApproveButton
              disabled={true}
              control={control}
              onClick={handleApproveToken}
              symbol0={tokens[0].symbol}
              symbol1={tokens[1].symbol}
            />
          ) : (
            <>
              <Button
                width="100%"
                variant="primary"
                bg="bottomBackground"
                hover={{ bg: 'disabled' }}
                onClick={() => {
                  setValue('lpAmount', '0.0');
                }}
              >
                {capitalize(t('common.reset'))}
              </Button>
              <RemoveLiquidityButton
                control={control}
                onClick={handleRemoveLiquidity}
                disabled={!true}
              />
            </>
          )}
        </Box>
      </WalletGuardButton>
    </>
  );
};

export default RemoveLiquidityCardContent;
