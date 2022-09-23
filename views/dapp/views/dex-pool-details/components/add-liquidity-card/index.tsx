import { BigNumber } from 'ethers';
import { useTranslations } from 'next-intl';
import { identity, o, prop } from 'ramda';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { useApprove, useIdAccount } from '@/hooks';
import { FixedPointMath } from '@/sdk';
import { LineLoaderSVG } from '@/svg';
import {
  capitalize,
  getInterestDexRouterAddress,
  isSameAddressZ,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import {
  AddLiquidityCardProps,
  IAddLiquidityForm,
  IToken,
} from './add-liquidity-card.types';
import AddLiquidityManager from './add-liquidity-manager';
import BalanceError from './balance-error';
import ErrorLiquidityMessage from './error-liquidity-message';
import InputBalance from './input-balance';
import { useAddLiquidity } from './use-add-lliquidity-card.hooks';

const filterFn = o<IToken, BigNumber, boolean>(
  (x: BigNumber) => x.isZero(),
  prop('allowance')
);

const INPUT_NAMES = ['token0Amount', 'token1Amount'] as Array<
  Exclude<keyof IAddLiquidityForm, 'error' | 'locked'>
>;

const AddLiquidityCard: FC<AddLiquidityCardProps> = ({
  tokens,
  isStable,
  fetchingInitialData,
  refetch,
}) => {
  const { account, chainId } = useIdAccount();
  const { writeAsync: approveToken0 } = useApprove(
    tokens[0].address,
    getInterestDexRouterAddress(chainId),
    { enabled: tokens[0].allowance.isZero() }
  );

  const { writeAsync: approveToken1 } = useApprove(
    tokens[1].address,
    getInterestDexRouterAddress(chainId),
    { enabled: tokens[1].allowance.isZero() }
  );
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);

  const { register, setValue, control } = useForm<IAddLiquidityForm>({
    defaultValues: {
      token0Amount: '0.0',
      token1Amount: '0.0',
      error: '',
      locked: false,
    },
  });

  const needsAllowance = tokens
    .map(({ allowance }) => allowance.isZero())
    .some(identity);

  const { writeAsync: _addLiquidity } = useAddLiquidity({
    tokens,
    chainId,
    account,
    control,
    isStable,
  });

  const approveToken = async (token: string) => {
    try {
      setLoading(true);

      const tx = isSameAddressZ(tokens[0].address, token)
        ? await approveToken0?.()
        : await approveToken1?.();

      await showTXSuccessToast(tx, chainId);
    } catch {
      throwError(t('error.generic'));
    } finally {
      setLoading(false);
      await refetch();
    }
  };

  const handleApproveToken = (token: string, symbol: string) =>
    showToast(approveToken(token), {
      loading: `${symbol}: ${capitalize(
        t('common.approve', { isLoading: 1 })
      )}`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const addLiquidity = async () => {
    try {
      setLoading(true);
      const tx = await _addLiquidity?.();
      await showTXSuccessToast(tx, chainId);
    } catch {
      throwError(t('error.generic'));
    } finally {
      setLoading(false);
      await refetch();
    }
  };

  const handleAddLiquidity = () =>
    showToast(addLiquidity(), {
      loading: `${capitalize(t('common.add', { isLoading: 1 }))}`,
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
          {t('dexPoolPairAddress.addLiquidity')}
        </Typography>
      </Box>
      {tokens.map(({ balance, decimals, allowance, Icon, symbol }, index) => (
        <InputBalance
          key={v4()}
          register={register}
          setValue={setValue}
          name={INPUT_NAMES[index]}
          balance={FixedPointMath.toNumber(balance, decimals)}
          disabled={loading || isFetchingQuote || allowance.isZero()}
          currencyPrefix={
            fetchingInitialData ? (
              <>
                <Box width="1rem" height="1rem" borderRadius="2rem">
                  <Skeleton height="100%" borderRadius="2rem" />
                </Box>
                <Box width="2.5rem" ml="L">
                  <Skeleton />
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                width="4.5rem"
                maxHeight="1rem"
                alignItems="center"
              >
                {Icon}
                <Typography variant="normal" ml="M" maxHeight="1rem">
                  {symbol}
                </Typography>
              </Box>
            )
          }
        />
      ))}
      <Box mb="L">
        {(loading || isFetchingQuote) && <LineLoaderSVG width="100%" />}
      </Box>
      <ErrorLiquidityMessage control={control} />
      {tokens.map(({ symbol, decimals, balance }, index) => (
        <BalanceError
          key={v4()}
          name={INPUT_NAMES[index]}
          balance={balance}
          control={control}
          decimals={decimals}
          symbol={symbol}
        />
      ))}
      <WalletGuardButton>
        <Box
          display="grid"
          gridColumnGap="1rem"
          gridTemplateColumns={
            needsAllowance
              ? `repeat(${tokens.filter(filterFn).length}, 1fr)`
              : '1fr 1fr'
          }
        >
          {fetchingInitialData ? (
            <Box width="200%" mx="auto" cursor="pointer">
              <Skeleton height="2rem" width="100%" borderRadius="L" />
            </Box>
          ) : (
            tokens.filter(filterFn).map(({ symbol, address }) => (
              <Button
                key={v4()}
                width="100%"
                variant="primary"
                disabled={loading}
                bg="bottomBackground"
                hover={{ bg: 'accentActive' }}
                onClick={() => handleApproveToken(address, symbol)}
              >
                {capitalize(t('common.approve', { isLoading: 0 }))} {symbol}
              </Button>
            ))
          )}
          {!needsAllowance && (
            <>
              <Button
                width="100%"
                variant="primary"
                bg="bottomBackground"
                disabled={loading}
                hover={{ bg: 'disabled' }}
                onClick={() => {
                  setValue('token0Amount', '0.0');
                  setValue('token1Amount', '0.0');
                  setValue('locked', false);
                }}
              >
                {capitalize(t('common.reset'))}
              </Button>
              <Button
                bg="accent"
                width="100%"
                variant="primary"
                disabled={loading}
                onClick={handleAddLiquidity}
                hover={{ bg: loading ? 'disabled' : 'accentActive' }}
              >
                {capitalize(t('common.add', { isLoading: Number(loading) }))}
              </Button>
            </>
          )}
        </Box>
      </WalletGuardButton>
      <AddLiquidityManager
        chainId={chainId}
        control={control}
        setValue={setValue}
        isFetchingQuote={isFetchingQuote}
        setIsFetchingQuote={setIsFetchingQuote}
        tokens={tokens}
        isStable={isStable}
      />
    </Box>
  );
};

export default AddLiquidityCard;
