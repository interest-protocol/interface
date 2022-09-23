import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { useApprove } from '@/hooks';
import { FixedPointMath } from '@/sdk';
import { LineLoaderSVG } from '@/svg';
import {
  capitalize,
  getInterestDexRouterAddress,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import ApproveButton from './approve-button';
import InputBalance from './input-balance';
import RemoveLiquidityButton from './remove-liquidity-button';
import { useRemoveLiquidity } from './remove-liquidity-card.hooks';
import {
  IRemoveLiquidityForm,
  LinearLoaderProps,
  RemoveLiquidityCardProps,
} from './remove-liquidity-card.types';
import RemoveLiquidityManager from './remove-liquidity-manager';
import TokenAmount from './token-amount';

const LinearLoader: FC<LinearLoaderProps> = ({ control }) => {
  const loading = useWatch({ control, name: 'loading' });

  return loading ? (
    <Box mb="L">
      <LineLoaderSVG width="100%" />
    </Box>
  ) : null;
};

const RemoveLiquidityCard: FC<RemoveLiquidityCardProps> = ({
  chainId,
  tokens,
  isStable,
  lpAllowance,
  lpBalance,
  pairAddress,
  isFetchingInitialData,
  account,
  refetch,
}) => {
  const t = useTranslations();
  const { writeAsync: approve } = useApprove(
    pairAddress,
    getInterestDexRouterAddress(chainId)
  );

  const { register, setValue, control } = useForm<IRemoveLiquidityForm>({
    defaultValues: {
      loading: false,
      removeLoading: false,
      lpAmount: '0.0',
      token0Amount: '0.0',
      token1Amount: '0.0',
    },
  });

  const { writeAsync: removeLiquidity } = useRemoveLiquidity({
    control,
    chainId,
    tokens,
    account,
    isStable,
    lpBalance,
  });

  const approveToken = async () => {
    try {
      const tx = await approve?.();

      await showTXSuccessToast(tx, chainId);
    } catch {
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

      const tx = await removeLiquidity?.();

      await showTXSuccessToast(tx, chainId);
    } catch {
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
    <Box bg="foreground" p="L" borderRadius="M" width="100%">
      <Box mb="L">
        <Typography
          width="100%"
          fontSize="S"
          variant="normal"
          textTransform="uppercase"
        >
          {t('dexPoolPairAddress.removeLiquidity')}
        </Typography>
      </Box>
      <InputBalance
        name="lpAmount"
        control={control}
        register={register}
        setValue={setValue}
        balance={FixedPointMath.toNumber(lpBalance)}
        disabled={lpAllowance.isZero() || lpBalance.isZero()}
        currencyPrefix={
          <Box display="flex" width="5rem">
            {tokens[0].Icon}
            {tokens[1].Icon}
            <Typography variant="normal" ml="M">
              LP
            </Typography>
          </Box>
        }
      />
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
      <RemoveLiquidityManager
        chainId={chainId || 0}
        control={control}
        setValue={setValue}
        isStable={isStable}
        token0Address={tokens[0].address}
        token1Address={tokens[1].address}
        token0Decimals={tokens[0].decimals}
        token1Decimals={tokens[1].decimals}
      />
      <WalletGuardButton>
        <Box
          mt="L"
          display="grid"
          gridColumnGap="1rem"
          gridTemplateColumns={lpAllowance.isZero() ? '1fr' : '1fr 1fr'}
        >
          {lpAllowance.isZero() ? (
            <ApproveButton
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
              />
            </>
          )}
        </Box>
      </WalletGuardButton>
    </Box>
  );
};

export default RemoveLiquidityCard;
