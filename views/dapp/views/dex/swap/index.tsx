import { getAddress } from 'ethers/lib/utils';
import { not, pathOr } from 'ramda';
import { FC, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { ERC_20_DATA, UNKNOWN_ERC_20 } from '@/constants';
import { Box } from '@/elements';
import {
  useGetDexAllowancesAndBalances,
  useIdAccount,
  useLocalStorage,
} from '@/hooks';
import {
  FixedPointMath,
  TOKEN_SYMBOL,
  ZERO_ADDRESS,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { CogsSVG } from '@/svg';
import { isSameAddressZ, numberToString } from '@/utils';

import SwapSelectCurrency from '../components/swap-select-currency';
import InputBalance from './input-balance';
import Settings from './settings';
import { SWAP_MESSAGES } from './swap.data';
import {
  ISwapForm,
  LocalSwapSettings,
  OnSelectCurrencyData,
} from './swap.types';
import SwapButton from './swap-button';
import SwapManager from './swap-manager';
import SwapMessage from './swap-message';

const Swap: FC = () => {
  const { chainId, account } = useIdAccount();
  const [localSettings, setLocalSettings] = useLocalStorage<LocalSwapSettings>(
    'interest-swap-settings',
    { slippage: '1', deadline: 5, autoFetch: true }
  );

  const INT = pathOr(UNKNOWN_ERC_20, [chainId, TOKEN_SYMBOL.INT], ERC_20_DATA);

  const ETH = pathOr(UNKNOWN_ERC_20, [chainId, TOKEN_SYMBOL.ETH], ERC_20_DATA);

  const { register, control, setValue, getValues } = useForm<ISwapForm>({
    defaultValues: {
      slippage: localSettings.slippage,
      deadline: localSettings.deadline,
      tokenIn: {
        address: INT.address,
        value: '0',
        decimals: INT.decimals,
        symbol: INT.symbol,
        setByUser: false,
      },
      tokenOut: {
        address: ETH.address,
        value: '0',
        decimals: ETH.decimals,
        symbol: ETH.symbol,
        setByUser: false,
      },
    },
  });

  const [showSettings, setShowSettings] = useState(false);
  const [hasNoMarket, setHasNoMarket] = useState(false);
  const [isFetchingAmountOutTokenIn, setFetchingAmountOutTokenIn] =
    useState(false);
  const [isFetchingAmountOutTokenOut, setFetchingAmountOutTokenOut] =
    useState(false);
  const [isTokenInOpenModal, setTokenInIsOpenModal] = useState(false);
  const [isTokenOutOpenModal, setTokenOutIsOpenModal] = useState(false);
  const [swapBase, setSwapBase] = useState<string | null>(null);
  const [amountOutError, setAmountOutError] = useState<null | string>(null);

  // We want the form to re-render if addresses change
  const tokenInAddress = useWatch({ control, name: 'tokenIn.address' });
  const tokenOutAddress = useWatch({ control, name: 'tokenOut.address' });

  const { balancesError, balancesData, mutate, loading } =
    useGetDexAllowancesAndBalances(
      chainId,
      tokenInAddress || ZERO_ADDRESS,
      tokenOutAddress || ZERO_ADDRESS
    );

  const needsApproval = loading
    ? false
    : pathOr(
        ZERO_BIG_NUMBER,
        [getAddress(tokenInAddress), 'allowance'],
        balancesData
      ).isZero();

  const toggleSettings = () => setShowSettings(not);

  const flipTokens = () => {
    const { tokenOut, tokenIn } = getValues();
    const prevTokenOut = tokenOut;
    const prevTokenIn = tokenIn;
    setValue('tokenIn', prevTokenOut);
    setValue('tokenOut', prevTokenIn);
  };

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') =>
    ({ address, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.address`, address);
      setValue(`${name}.decimals`, decimals);
      setValue(`${name}.symbol`, symbol);
      setValue('tokenOut.value', '0.0');
      setValue('tokenIn.value', '0.0');
      setHasNoMarket(false);
      setTokenInIsOpenModal(false);
      setTokenOutIsOpenModal(false);
    };

  const isDisabled = useMemo(
    () =>
      !!(
        isSameAddressZ(tokenInAddress, tokenOutAddress) ||
        isFetchingAmountOutTokenOut ||
        isFetchingAmountOutTokenIn ||
        amountOutError ||
        balancesError ||
        hasNoMarket ||
        loading
      ),
    [
      tokenInAddress,
      tokenOutAddress,
      isFetchingAmountOutTokenIn,
      isFetchingAmountOutTokenOut,
      amountOutError,
      balancesError,
      hasNoMarket,
      loading,
    ]
  );

  return (
    <>
      <Box
        my="L"
        px="L"
        pb="L"
        color="text"
        width="100%"
        bg="foreground"
        borderRadius="M"
        minWidth={['20rem', '40rem']}
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
                setValue={setValue}
                setLocalSettings={setLocalSettings}
                localSettings={localSettings}
              />
            )}
          </Box>
        </Box>
        <Box color="text" width="100%" display="grid" gridGap="1rem">
          <Box
            py="L"
            display="flex"
            borderRadius="M"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <InputBalance
              balance={FixedPointMath.toNumber(
                pathOr(
                  ZERO_BIG_NUMBER,
                  [getAddress(tokenInAddress), 'balance'],
                  balancesData
                ),
                getValues().tokenIn.decimals,
                0,
                12
              )}
              max={numberToString(
                FixedPointMath.toNumber(
                  pathOr(
                    ZERO_BIG_NUMBER,
                    [getAddress(tokenInAddress), 'balance'],
                    balancesData
                  ),
                  getValues().tokenIn.decimals,
                  0,
                  12
                )
              )}
              name="tokenIn"
              register={register}
              setValue={setValue}
              disabled={isFetchingAmountOutTokenIn}
              handleSelectedByUser={() => {
                setValue(`tokenIn.setByUser`, true);
                setValue(`tokenOut.setByUser`, false);
              }}
              currencySelector={
                <SwapSelectCurrency
                  currentToken={tokenInAddress}
                  onSelectCurrency={onSelectCurrency('tokenIn')}
                  symbol={getValues().tokenIn.symbol}
                  isModalOpen={isTokenInOpenModal}
                  setIsModalOpen={setTokenInIsOpenModal}
                />
              }
            />
            <Box
              width="3rem"
              height="3rem"
              display="flex"
              bg="background"
              cursor="pointer"
              borderRadius="50%"
              border="1px solid"
              mx={['XL', 'auto']}
              position="relative"
              alignItems="center"
              borderColor="accent"
              onClick={flipTokens}
              justifyContent="center"
              mt={['-1rem', '-1.5rem']}
              mb={['-1.2rem', '-1.5rem']}
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
              balance={FixedPointMath.toNumber(
                pathOr(
                  ZERO_BIG_NUMBER,
                  [getAddress(tokenOutAddress), 'balance'],
                  balancesData
                ),
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
                  symbol={getValues().tokenOut.symbol}
                  isModalOpen={isTokenOutOpenModal}
                  setIsModalOpen={setTokenOutIsOpenModal}
                />
              }
            />
          </Box>
        </Box>
        {(isFetchingAmountOutTokenOut || isFetchingAmountOutTokenIn) && (
          <SwapMessage {...SWAP_MESSAGES['loading-amount']} />
        )}
        {amountOutError && (
          <SwapMessage {...SWAP_MESSAGES['error-amount-out']} />
        )}
        {balancesError && <SwapMessage {...SWAP_MESSAGES['error-balances']} />}
        {isSameAddressZ(tokenInAddress, tokenOutAddress) && (
          <SwapMessage {...SWAP_MESSAGES['error-same-token']} />
        )}
        {hasNoMarket && <SwapMessage {...SWAP_MESSAGES['info-no-pool']} />}
        <SwapButton
          disabled={isDisabled}
          getValues={getValues}
          tokenInAddress={tokenInAddress}
          setSwapBase={setSwapBase}
          swapBase={swapBase}
          chainId={chainId}
          account={account}
          control={control}
          fetchingAmount={
            isFetchingAmountOutTokenOut || isFetchingAmountOutTokenIn
          }
          fetchingBalancesData={loading}
          fetchingBaseData={!balancesData && !balancesError}
          parsedTokenInBalance={pathOr(
            ZERO_BIG_NUMBER,
            [getAddress(tokenInAddress), 'balance'],
            balancesData
          )}
          updateBalances={mutate}
          needsApproval={needsApproval}
        />
      </Box>
      {localSettings.autoFetch && (
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
      )}
    </>
  );
};

export default Swap;
