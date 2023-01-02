import { BigNumber } from 'ethers';
import { useTranslations } from 'next-intl';
import { identity, o, prop } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Button } from '@/elements';
import { LineLoaderSVG } from '@/svg';
import { capitalize, showToast, throwError } from '@/utils';
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

const filterFn = o<IToken, BigNumber, boolean>(
  (x: BigNumber) => x.isZero(),
  prop('allowance')
);

const AddLiquidityCardContent: FC<AddLiquidityCardContentProps> = ({
  tokens,
  fetchingInitialData,
  refetch,
  isFetchingQuote,
  control,
  setValue,
  setLoading,
  loading,
}) => {
  const t = useTranslations();

  const needsAllowance = tokens
    .map(({ allowance }) => allowance.isZero())
    .some(identity);

  const approveToken = async () => {
    try {
      setLoading(true);

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
    showToast(approveToken(), {
      loading: `${symbol}: ${capitalize(
        t('common.approve', { isLoading: 1 })
      )}`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

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
              <AddLiquidityButton
                addLiquidity={undefined}
                refetch={refetch}
                setLoading={setLoading}
                loading={loading || fetchingInitialData || isFetchingQuote}
              />
            </>
          )}
        </Box>
      </WalletGuardButton>
    </>
  );
};

export default AddLiquidityCardContent;
