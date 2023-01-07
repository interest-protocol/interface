import { useTranslations } from 'next-intl';
import { identity, o, prop } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Button } from '@/elements';
import { LineLoaderSVG } from '@/svg';
import { capitalize, showToast } from '@/utils';

import AddLiquidityButton from './add-liquidity-button';
import {
  AddLiquidityCardContentProps,
  INPUT_NAMES,
  IToken,
} from './add-liquidity-card.types';
import BalanceError from './balance-error';
import ErrorLiquidityMessage from './error-liquidity-message';

const filterFn = o<IToken, number, boolean>(
  (x: number) => x === 0,
  prop('allowance')
);

const AddLiquidityCardContent: FC<AddLiquidityCardContentProps> = ({
  tokens,
  isStable,
  fetchingInitialData,
  isFetchingQuote,
  control,
  setValue,
  setLoading,
  loading,
}) => {
  const t = useTranslations();

  const needsAllowance = tokens
    .map(({ allowance }) => allowance === 0)
    .some(identity);

  const approveToken = async (token: string) => {
    console.log(token, 'aprrove-token');
  };

  const handleApproveToken = (token: string, symbol: string) =>
    showToast(approveToken(token), {
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
              setLoading={setLoading}
              loading={loading || fetchingInitialData || isFetchingQuote}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default AddLiquidityCardContent;
