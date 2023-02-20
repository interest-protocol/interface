import { BigNumber } from 'ethers';
import { useTranslations } from 'next-intl';
import { identity, o, prop } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { ErrorButton } from '@/components';
import { Box, Button } from '@/elements';
import { useApprove } from '@/hooks';
import { LineLoaderSVG } from '@/svg';
import {
  capitalize,
  getInterestDexRouterAddress,
  isSameAddressZ,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';
import { WalletGuardButton } from '@/views/dapp/components';

import AddLiquidityButton from './add-liquidity-button';
import {
  AddLiquidityCardContentProps,
  INPUT_NAMES,
  IToken,
} from './add-liquidity-card.types';
import BalanceError from './balance-error';
import ErrorLiquidityMessage from './error-liquidity-message';
import { useAddLiquidity } from './use-add-liquidity-card.hooks';

const filterFn = o<IToken, BigNumber, boolean>(
  (x: BigNumber) => x.isZero(),
  prop('allowance')
);

const AddLiquidityCardContent: FC<AddLiquidityCardContentProps> = ({
  tokens,
  isStable,
  fetchingInitialData,
  refetch,
  isFetchingQuote,
  control,
  setValue,
  chainId,
  account,
  setLoading,
  loading,
}) => {
  const {
    useContractWriteReturn: {
      writeAsync: approveToken0,
      isError: isWriteErrorApprove0,
    },
    usePrepareContractReturn: { isError: isPrepareErrorApprove0 },
  } = useApprove(tokens[0].address, getInterestDexRouterAddress(chainId), {
    enabled: tokens[0].allowance.isZero(),
  });

  const {
    useContractWriteReturn: {
      writeAsync: approveToken1,
      isError: isWriteErrorApprove1,
    },
    usePrepareContractReturn: { isError: isPrepareErrorApprove1 },
  } = useApprove(tokens[1].address, getInterestDexRouterAddress(chainId), {
    enabled: tokens[1].allowance.isZero(),
  });

  const t = useTranslations();

  const needsAllowance = tokens
    .map(({ allowance }) => allowance.isZero())
    .some(identity);

  const approveToken = async (token: string) => {
    try {
      setLoading(true);

      const tx = isSameAddressZ(tokens[0].address, token)
        ? await approveToken0?.()
        : await approveToken1?.();

      await showTXSuccessToast(tx, chainId);
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexPoolDetailsAddLiquidity,
        functionName: 'approveToken',
      });
    } catch {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexPoolDetailsAddLiquidity,
        functionName: 'approveToken',
      });
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

  const {
    useContractWriteReturn: { writeAsync: addLiquidity, isError: isWriteError },
    usePrepareContractReturn: { isError: isPrepareError },
  } = useAddLiquidity({
    chainId,
    account,
    isStable,
    tokens,
    control,
  });

  if (
    isWriteErrorApprove0 ||
    isPrepareErrorApprove0 ||
    isWriteErrorApprove1 ||
    isPrepareErrorApprove1
  )
    return (
      <ErrorButton
        styleProps={{ width: '100%', variant: 'primary' }}
        error={t(
          isPrepareErrorApprove0 || isPrepareErrorApprove1
            ? 'error.contract.prepare'
            : 'error.contract.write'
        )}
      />
    );

  return (
    <>
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
              {isWriteError || isPrepareError ? (
                <ErrorButton
                  styleProps={{ width: '100%', variant: 'primary' }}
                  error={t(
                    isPrepareError
                      ? 'error.contract.prepare'
                      : 'error.contract.write'
                  )}
                />
              ) : (
                <AddLiquidityButton
                  addLiquidity={
                    addLiquidity ? async () => await addLiquidity() : undefined
                  }
                  chainId={chainId}
                  refetch={refetch}
                  setLoading={setLoading}
                  loading={loading || fetchingInitialData || isFetchingQuote}
                />
              )}
            </>
          )}
        </Box>
      </WalletGuardButton>
    </>
  );
};

export default AddLiquidityCardContent;
