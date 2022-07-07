import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getAmountsOut } from '@/api';
import { DEFAULT_ACCOUNT, SWAP_BASES } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { useDebounce } from '@/hooks';
import { IntMath, ZERO_ADDRESS } from '@/sdk';
import { getNativeBalance } from '@/state/core/core.selectors';
import { userBalanceActions } from '@/state/user-balances/user-balances.actions';
import { userBalanceSelectById } from '@/state/user-balances/user-balances.selectors';
import { userBalanceEntitySelectors } from '@/state/user-balances/user-balances.selectors';
import { LoadingSVG } from '@/svg';
import { isSameAddress, isZeroAddress, safeToBigNumber } from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import InputBalance from '../components/input-balance';
import SwapSelectCurrency from '../components/swap-select-currency';
import { AmountCacheValue, SwapFormProps } from './swap.types';
import { handleTokenBalance } from './utils';

const AMOUNT_OUT_CACHE = new Map<string, AmountCacheValue>();

const SwapForm: FC<SwapFormProps> = ({ setValue, register, control }) => {
  const [isSwapping, setIsSwapping] = useState(false);
  const [isFetchingAmountOutTokenIn, setFetchingAmountOutTokenIn] =
    useState(false);
  const [isFetchingAmountOutTokenOut, setFetchingAmountOutTokenOut] =
    useState(false);
  const [hasNoMarket, setHasNoMarket] = useState(false);
  const [swapBase, setSwapBase] = useState<string | null>(null);
  const [amountOutError, setAmountOutError] = useState<null | string>(null);
  const dispatch = useDispatch();
  const { chainId, account } = useIdAccount();
  const tokenIn = useWatch({ control, name: 'tokenIn' });
  const tokenOut = useWatch({ control, name: 'tokenOut' });
  const nativeBalance = useSelector(getNativeBalance) as string;
  const tokenInBalance = useSelector(userBalanceSelectById(tokenIn.address));
  const tokenOutBalance = useSelector(userBalanceSelectById(tokenOut.address));
  const tokenIds = useSelector(userBalanceEntitySelectors.selectIds);

  const parsedTokenInBalance = handleTokenBalance(
    tokenInBalance,
    nativeBalance
  );

  const parsedTokenOutBalance = handleTokenBalance(
    tokenOutBalance,
    nativeBalance
  );

  useEffect(() => {
    const tokensToFetch: Array<string> = [];
    if (!tokenIds.includes(tokenIn.address))
      tokensToFetch.push(tokenOut.address);

    if (!tokenIds.includes(tokenOut.address))
      tokensToFetch.push(tokenOut.address);

    if (tokensToFetch.length)
      dispatch(
        userBalanceActions.addUserBalancesStart({
          chainId,
          user: account || DEFAULT_ACCOUNT,
          tokens: tokensToFetch.filter((x) => !isSameAddress(ZERO_ADDRESS, x)),
        })
      );
  }, [tokenIds, tokenIn.address, tokenOut.address, dispatch, chainId, account]);

  const debouncedTokenInValue = useDebounce(tokenIn.value, 1500);
  const debouncedTokenOutValue = useDebounce(tokenOut.value, 1500);

  useEffect(() => {
    if (hasNoMarket) setHasNoMarket(false);
  }, [tokenIn.address, tokenOut.address]);

  // User is typing a value in the token in input
  // We need to disable tokenOut input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenOut) return;

    const key = `${tokenIn.address}-${tokenOut.address}-${debouncedTokenInValue}`;

    const value = AMOUNT_OUT_CACHE.get(key);

    const currentTime = new Date().getTime();

    // Value is valid
    if (value && value.timestamp + 30000 >= currentTime) {
      setValue('tokenOut.value', value.amountOut);
      return;
    }

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenOut(true);

    getAmountsOut(
      chainId,
      tokenIn.address,
      tokenOut.address,
      safeToBigNumber(debouncedTokenInValue, tokenIn.decimals),
      SWAP_BASES[chainId]
    )
      .then((data) => {
        if (isZeroAddress(data.base) && data.amountOut.isZero()) {
          setValue('tokenOut.value', '0');
          AMOUNT_OUT_CACHE.set(key, {
            amountOut: '0',
            timestamp: new Date().getTime(),
          });
          setHasNoMarket(true);
          return;
        }

        setHasNoMarket(false);
        const value = IntMath.toNumber(
          data.amountOut,
          tokenOut.decimals,
          0,
          12
        ).toString();
        setSwapBase(data.base);
        setValue('tokenOut.value', value);
        AMOUNT_OUT_CACHE.set(key, {
          amountOut: value,
          timestamp: new Date().getTime(),
        });
      })
      .catch(() => {
        setAmountOutError(`Error fetching ${tokenOut.symbol} amount`);
      })
      .finally(() => setFetchingAmountOutTokenOut(false));
  }, [
    debouncedTokenInValue,
    setValue,
    tokenIn.address,
    tokenOut.address,
    chainId,
  ]);

  // User is typing a value in the token out input
  // We need to disable tokenIn input and fetch a value
  useEffect(() => {
    if (isFetchingAmountOutTokenIn) return;

    const key = `${tokenOut.address}-${tokenIn.address}-${debouncedTokenOutValue}`;

    const value = AMOUNT_OUT_CACHE.get(key);

    const currentTime = new Date().getTime();

    // Value is valid
    if (value && value.timestamp + 30000 >= currentTime) {
      setValue('tokenIn.value', value.amountOut);
      return;
    }

    // If the value is stale or does not exist, we need to fetch
    setFetchingAmountOutTokenIn(true);

    getAmountsOut(
      chainId,
      tokenOut.address,
      tokenIn.address,
      safeToBigNumber(debouncedTokenOutValue, tokenOut.decimals),
      SWAP_BASES[chainId]
    )
      .then((data) => {
        if (isZeroAddress(data.base) && data.amountOut.isZero()) {
          setValue('tokenIn.value', '0');
          AMOUNT_OUT_CACHE.set(key, {
            amountOut: '0',
            timestamp: new Date().getTime(),
          });
          setHasNoMarket(true);
          return;
        }

        const value = IntMath.toNumber(
          data.amountOut,
          tokenIn.decimals,
          0,
          12
        ).toString();
        setSwapBase(data.base);
        setHasNoMarket(false);
        setValue('tokenIn.value', value);
        AMOUNT_OUT_CACHE.set(key, {
          amountOut: value,
          timestamp: new Date().getTime(),
        });
      })
      .catch(() => {
        setAmountOutError(`Error fetching ${tokenIn.symbol} amount`);
      })
      .finally(() => setFetchingAmountOutTokenIn(false));
  }, [
    debouncedTokenOutValue,
    setValue,
    tokenIn.address,
    tokenOut.address,
    chainId,
  ]);

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') => (address: string) =>
      setValue(`${name}.address`, address);

  const flipTokens = () => {
    setValue('tokenIn.address', tokenOut.address);
    setValue('tokenIn.value', tokenOut.value);
    setValue('tokenOut.address', tokenIn.address);
    setValue('tokenOut.value', '0');
  };

  const swap = async () => {};

  return (
    <Box color="text" width="100%" display="grid" gridGap="1rem" pb="L">
      <Box
        py="L"
        display="flex"
        borderRadius="M"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <InputBalance
          name="tokenIn.value"
          register={register}
          setValue={setValue}
          max={IntMath.toNumber(
            parsedTokenInBalance,
            tokenIn.decimals,
            0,
            12
          ).toString()}
          currencySelector={
            <SwapSelectCurrency
              currentToken={tokenIn.address}
              onSelectCurrency={onSelectCurrency('tokenIn')}
            />
          }
        />
        <Box
          mx="auto"
          my="-1.5rem"
          width="3rem"
          height="3rem"
          display="flex"
          bg="background"
          cursor="pointer"
          borderRadius="50%"
          border="1px solid"
          position="relative"
          alignItems="center"
          borderColor="accent"
          onClick={flipTokens}
          justifyContent="center"
          hover={{
            boxShadow: '0 0 0.5rem #0055FF',
          }}
        >
          ⥯
        </Box>
        <InputBalance
          disabled
          name="tokenOut.value"
          register={register}
          setValue={setValue}
          currencySelector={
            <SwapSelectCurrency
              currentToken={tokenOut.address}
              onSelectCurrency={onSelectCurrency('tokenOut')}
            />
          }
        />
        {isFetchingAmountOutTokenIn ||
          (isFetchingAmountOutTokenOut && <div>Fetching amount out...</div>)}
        <WalletGuardButton>
          <Button
            mt="L"
            width="100%"
            onClick={swap}
            variant="primary"
            disabled={isSwapping}
            hover={{ bg: 'accentAlternativeActive' }}
            bg={isSwapping ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {isSwapping ? (
              <Box as="span" display="flex" justifyContent="center">
                <LoadingSVG width="1rem" height="1rem" />
                <Typography as="span" variant="normal" ml="M" fontSize="S">
                  Swapping...
                </Typography>
              </Box>
            ) : (
              'Swap'
            )}
          </Button>
        </WalletGuardButton>
      </Box>
    </Box>
  );
};
export default SwapForm;
