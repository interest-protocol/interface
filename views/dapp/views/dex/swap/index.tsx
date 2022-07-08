import { not } from 'ramda';
import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ERC_20_DATA } from '@/constants';
import { Box } from '@/elements';
import { useIdAccount, useLocalStorage } from '@/hooks';
import { IntMath, TOKEN_SYMBOL, ZERO_ADDRESS } from '@/sdk';
import { getNativeBalance } from '@/state/core/core.selectors';
import { CogsSVG } from '@/svg';

import SwapSelectCurrency from '../components/swap-select-currency';
import InputBalance from './input-balance';
import Settings from './settings';
import { ISwapForm, LocalSwapSettings } from './swap.types';
import SwapButton from './swap-button';
import SwapErrorMessage from './swap-error';
import SwapFetchingAmount from './swap-fetching-amount';
import SwapManager from './swap-manager';
import { handleTokenBalance, useGetDexAllowancesAndBalances } from './utils';

const Swap: FC = () => {
  const { chainId, account } = useIdAccount();
  const [localSettings, setLocalSettings] = useLocalStorage<LocalSwapSettings>(
    'interest-swap-settings',
    { slippage: 1, deadline: 5 }
  );

  const { register, control, setValue, getValues } = useForm<ISwapForm>({
    defaultValues: {
      tokenIn: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].address,
        value: '0',
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].symbol,
        setByUser: false,
      },
      tokenOut: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].address,
        value: '0',
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].symbol,
        setByUser: false,
      },
      slippage: localSettings.slippage,
      deadline: localSettings.deadline,
    },
  });

  const [showSettings, setShowSettings] = useState(false);
  const [hasNoMarket, setHasNoMarket] = useState(false);

  const [isFetchingAmountOutTokenIn, setFetchingAmountOutTokenIn] =
    useState(false);
  const [isFetchingAmountOutTokenOut, setFetchingAmountOutTokenOut] =
    useState(false);

  const [swapBase, setSwapBase] = useState<string | null>(null);
  const [amountOutError, setAmountOutError] = useState<null | string>(null);

  // We want the form to re-render if addresses change
  const tokenInAddress = useWatch({ control, name: 'tokenIn.address' });
  const tokenOutAddress = useWatch({ control, name: 'tokenOut.address' });

  // Handle error case
  const { balancesError, balancesData, mutate } =
    useGetDexAllowancesAndBalances(
      account,
      chainId,
      tokenInAddress || ZERO_ADDRESS,
      tokenOutAddress || ZERO_ADDRESS
    );

  const nativeBalance = useSelector(getNativeBalance) as string;

  const parsedTokenInBalance = handleTokenBalance(
    tokenInAddress,
    balancesData.tokenInBalance,
    nativeBalance
  );

  const parsedTokenOutBalance = handleTokenBalance(
    tokenOutAddress,
    balancesData.tokenOutBalance,
    nativeBalance
  );

  const toggleSettings = () => setShowSettings(not);

  const setDeadline = (x: number) => {
    setValue('deadline', x);
    setLocalSettings({ ...localSettings, deadline: x });
  };

  const setSlippage = (x: number) => {
    setValue('slippage', x);
    setLocalSettings({ ...localSettings, slippage: x });
  };

  const flipTokens = () => {
    const { tokenOut, tokenIn } = getValues();
    const prevTokenOut = tokenOut;
    const prevTokenIn = tokenIn;
    setValue('tokenIn.address', prevTokenOut.address);
    setValue('tokenIn.value', prevTokenOut.value);
    setValue('tokenOut.address', prevTokenIn.address);
    setValue('tokenOut.value', '0');
  };

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') => (address: string) => {
      setValue(`${name}.address`, address);
      setHasNoMarket(false);
    };

  return (
    <>
      <Box
        my="L"
        px="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth={['20rem', '40rem']}
        borderRadius="M"
      >
        <Box
          pt="L"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Box
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              transform="rotate(0deg)"
              transition="all 300ms ease-in-out"
              hover={{
                color: 'accent',
                transform: 'rotate(90deg)',
              }}
              onClick={toggleSettings}
            >
              <CogsSVG width="1.5rem" />
            </Box>
            {showSettings && (
              <Settings
                toggle={toggleSettings}
                control={control}
                register={register}
                setDeadline={setDeadline}
                setSlippage={setSlippage}
              />
            )}
          </Box>
        </Box>
        <Box color="text" width="100%" display="grid" gridGap="1rem" pb="L">
          <Box
            py="L"
            display="flex"
            borderRadius="M"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <InputBalance
              balance={IntMath.toNumber(
                parsedTokenInBalance,
                getValues().tokenIn.decimals,
                0,
                12
              )}
              name="tokenIn"
              register={register}
              setValue={setValue}
              disabled={isFetchingAmountOutTokenIn}
              handleSelectedByUser={() => {
                setValue(`tokenIn.setByUser`, true);
                setValue(`tokenOut.setByUser`, false);
              }}
              max={IntMath.toNumber(
                parsedTokenInBalance,
                getValues().tokenIn.decimals,
                0,
                12
              ).toString()}
              currencySelector={
                <SwapSelectCurrency
                  currentToken={tokenInAddress}
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
              name="tokenOut"
              register={register}
              setValue={setValue}
              disabled={isFetchingAmountOutTokenOut}
              balance={IntMath.toNumber(
                parsedTokenOutBalance,
                getValues().tokenOut.decimals,
                0,
                12
              )}
              handleSelectedByUser={() => {
                setValue(`tokenIn.setByUser`, false);
                setValue(`tokenOut.setByUser`, true);
              }}
              currencySelector={
                <SwapSelectCurrency
                  currentToken={tokenOutAddress}
                  disabled={isFetchingAmountOutTokenOut}
                  onSelectCurrency={onSelectCurrency('tokenOut')}
                />
              }
            />
          </Box>
        </Box>
        <SwapFetchingAmount
          fetching={isFetchingAmountOutTokenOut || isFetchingAmountOutTokenIn}
        />
        <SwapErrorMessage
          errorMessage={hasNoMarket ? 'Info: This pair has no liquidity' : null}
        />
        <SwapButton
          tokenInAddress={tokenInAddress}
          setSwapBase={setSwapBase}
          swapBase={swapBase}
          chainId={chainId}
          balancesData={balancesData}
          account={account}
          getValues={getValues}
          parsedTokenInBalance={parsedTokenInBalance}
          updateBalances={mutate}
        />
      </Box>
      <SwapManager
        control={control}
        chainId={chainId}
        setValue={setValue}
        isFetchingAmountOutTokenIn={isFetchingAmountOutTokenIn}
        isFetchingAmountOutTokenOut={isFetchingAmountOutTokenOut}
        hasNoMarket={hasNoMarket}
        setHasNoMarket={setHasNoMarket}
        setFetchingAmountOutTokenIn={setFetchingAmountOutTokenIn}
        setFetchingAmountOutTokenOut={setFetchingAmountOutTokenOut}
        setSwapBase={setSwapBase}
        setAmountOutError={setAmountOutError}
      />
    </>
  );
};

export default Swap;
