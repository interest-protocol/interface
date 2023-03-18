import { getAddress } from 'ethers/lib/utils';
import { not, pathOr } from 'ramda';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Box } from '@/elements';
import { useGetDexAllowancesAndBalances } from '@/hooks';
import { FixedPointMath, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { CogsSVG } from '@/svg';
import { isSameAddressZ, numberToString } from '@/utils';
import { GAPage } from '@/utils/analytics';

import SwapSelectCurrency from '../components/swap-select-currency';
import InputBalance from './input-balance';
import SettingsDropdown from './settings/settings-dropdown';
import { SWAP_MESSAGES } from './swap.data';
import { OnSelectCurrencyData, SwapProps } from './swap.types';
import SwapButton from './swap-button';
import SwapManager from './swap-manager';
import SwapMessage from './swap-message';

const Swap: FC<SwapProps> = ({
  chainId,
  account,
  setLocalSettings,
  localSettings,
  formSwap,
  showSettingsState,
  hasNoMarketState,
  isFetchingAmountOutTokenInState,
  isFetchingAmountOutTokenOutState,
  isTokenInOpenModalState,
  isTokenOutOpenModalState,
  swapBaseState,
  amountOutErrorState,
}) => {
  // We want the form to re-render if addresses change
  const tokenInAddress = useWatch({
    control: formSwap.control,
    name: 'tokenIn.address',
  });
  const tokenOutAddress = useWatch({
    control: formSwap.control,
    name: 'tokenOut.address',
  });

  const { balancesError, balancesData, loading, refetch } =
    useGetDexAllowancesAndBalances(
      chainId,
      tokenInAddress || ZERO_ADDRESS,
      tokenOutAddress || ZERO_ADDRESS,
      GAPage.DexSwap
    );

  const needsApproval = loading
    ? false
    : pathOr(
        ZERO_BIG_NUMBER,
        [getAddress(tokenInAddress), 'allowance'],
        balancesData
      ).isZero();

  const toggleSettings = () => showSettingsState.setShowSettings(not);

  const flipTokens = () => {
    const { tokenOut, tokenIn } = formSwap.getValues();
    const prevTokenOut = tokenOut;
    const prevTokenIn = tokenIn;
    formSwap.setValue('tokenIn', prevTokenOut);
    formSwap.setValue('tokenOut', prevTokenIn);
  };

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') =>
    ({ address, decimals, symbol }: OnSelectCurrencyData) => {
      formSwap.setValue(`${name}.address`, address);
      formSwap.setValue(`${name}.decimals`, decimals);
      formSwap.setValue(`${name}.symbol`, symbol);
      formSwap.setValue('tokenOut.value', '0.0');
      formSwap.setValue('tokenIn.value', '0.0');
      hasNoMarketState.setHasNoMarket(false);
      isTokenInOpenModalState.setTokenInIsOpenModal(false);
      isTokenOutOpenModalState.setTokenOutIsOpenModal(false);
    };

  const isDisabled = useMemo(
    () =>
      !!(
        isSameAddressZ(tokenInAddress, tokenOutAddress) ||
        isFetchingAmountOutTokenOutState.isFetchingAmountOutTokenOut ||
        isFetchingAmountOutTokenInState.isFetchingAmountOutTokenIn ||
        amountOutErrorState.amountOutError ||
        balancesError ||
        hasNoMarketState.hasNoMarket ||
        loading
      ),
    [
      tokenInAddress,
      tokenOutAddress,
      isFetchingAmountOutTokenInState.isFetchingAmountOutTokenIn,
      isFetchingAmountOutTokenOutState.isFetchingAmountOutTokenOut,
      amountOutErrorState.amountOutError,
      balancesError,
      hasNoMarketState.hasNoMarket,
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
              <CogsSVG width="1.5rem" maxHeight="1.5rem" maxWidth="1.5rem" />
            </Box>
            {showSettingsState.showSettings && (
              <SettingsDropdown
                isOpen={showSettingsState.showSettings}
                onClose={toggleSettings}
                localSettings={localSettings}
                setLocalSettings={setLocalSettings}
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
                formSwap.getValues('tokenIn.decimals'),
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
                  formSwap.getValues('tokenIn.decimals'),
                  0,
                  12
                )
              )}
              name="tokenIn"
              register={formSwap.register}
              setValue={formSwap.setValue}
              disabled={
                isFetchingAmountOutTokenInState.isFetchingAmountOutTokenIn
              }
              handleSelectedByUser={() => {
                formSwap.setValue(`tokenIn.setByUser`, true);
                formSwap.setValue(`tokenOut.setByUser`, false);
              }}
              currencySelector={
                <SwapSelectCurrency
                  currentToken={tokenInAddress}
                  isModalOpen={isTokenInOpenModalState.isTokenInOpenModal}
                  symbol={formSwap.getValues('tokenIn.symbol')}
                  address={formSwap.getValues('tokenIn.address')}
                  setIsModalOpen={isTokenInOpenModalState.setTokenInIsOpenModal}
                  onSelectCurrency={onSelectCurrency('tokenIn')}
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
              register={formSwap.register}
              setValue={formSwap.setValue}
              disabled={
                isFetchingAmountOutTokenOutState.isFetchingAmountOutTokenOut
              }
              balance={FixedPointMath.toNumber(
                pathOr(
                  ZERO_BIG_NUMBER,
                  [getAddress(tokenOutAddress), 'balance'],
                  balancesData
                ),
                formSwap.getValues().tokenOut.decimals,
                0,
                12
              )}
              handleSelectedByUser={() => {
                formSwap.setValue(`tokenIn.setByUser`, false);
                formSwap.setValue(`tokenOut.setByUser`, true);
              }}
              currencySelector={
                <SwapSelectCurrency
                  currentToken={tokenOutAddress}
                  isModalOpen={isTokenOutOpenModalState.isTokenOutOpenModal}
                  symbol={formSwap.getValues('tokenOut.symbol')}
                  disabled={
                    isFetchingAmountOutTokenOutState.isFetchingAmountOutTokenOut
                  }
                  address={formSwap.getValues('tokenOut.address')}
                  setIsModalOpen={
                    isTokenOutOpenModalState.setTokenOutIsOpenModal
                  }
                  onSelectCurrency={onSelectCurrency('tokenOut')}
                />
              }
            />
          </Box>
        </Box>
        {(isFetchingAmountOutTokenOutState.isFetchingAmountOutTokenOut ||
          isFetchingAmountOutTokenInState.isFetchingAmountOutTokenIn) && (
          <SwapMessage {...SWAP_MESSAGES['loading-amount']} />
        )}
        {amountOutErrorState.amountOutError && (
          <SwapMessage {...SWAP_MESSAGES['error-amount-out']} />
        )}
        {balancesError && <SwapMessage {...SWAP_MESSAGES['error-balances']} />}
        {isSameAddressZ(tokenInAddress, tokenOutAddress) && (
          <SwapMessage {...SWAP_MESSAGES['error-same-token']} />
        )}
        {hasNoMarketState.hasNoMarket && (
          <SwapMessage {...SWAP_MESSAGES['info-no-pool']} />
        )}
        <SwapButton
          chainId={chainId}
          account={account}
          control={formSwap.control}
          swapBase={swapBaseState.swapBase}
          disabled={isDisabled}
          setValue={formSwap.setValue}
          getValues={formSwap.getValues}
          setSwapBase={swapBaseState.setSwapBase}
          needsApproval={needsApproval}
          localSettings={localSettings}
          fetchingBalancesData={loading}
          tokenInAddress={tokenInAddress}
          fetchingBaseData={!balancesData && !balancesError}
          fetchingAmount={
            isFetchingAmountOutTokenOutState.isFetchingAmountOutTokenOut ||
            isFetchingAmountOutTokenInState.isFetchingAmountOutTokenIn
          }
          parsedTokenInBalance={pathOr(
            ZERO_BIG_NUMBER,
            [getAddress(tokenInAddress), 'balance'],
            balancesData
          )}
          refetch={refetch}
        />
      </Box>
      {localSettings.autoFetch && (
        <SwapManager
          control={formSwap.control}
          chainId={chainId}
          setValue={formSwap.setValue}
          isFetchingAmountOutTokenIn={
            isFetchingAmountOutTokenInState.isFetchingAmountOutTokenIn
          }
          isFetchingAmountOutTokenOut={
            isFetchingAmountOutTokenOutState.isFetchingAmountOutTokenOut
          }
          hasNoMarket={hasNoMarketState.hasNoMarket}
          setHasNoMarket={hasNoMarketState.setHasNoMarket}
          setFetchingAmountOutTokenIn={
            isFetchingAmountOutTokenInState.setFetchingAmountOutTokenIn
          }
          setFetchingAmountOutTokenOut={
            isFetchingAmountOutTokenOutState.setFetchingAmountOutTokenOut
          }
          setSwapBase={swapBaseState.setSwapBase}
          setAmountOutError={amountOutErrorState.setAmountOutError}
        />
      )}
    </>
  );
};

export default Swap;
