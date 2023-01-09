import { find, propEq } from 'ramda';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { DEX_TOKENS_DATA } from '@/constants';
import { Box } from '@/elements';
import { AddressZero, TOKEN_SYMBOL } from '@/sdk';

import SwapSelectCurrency from '../components/swap-select-currency';
import InputBalance from './input-balance';
import { ISwapForm, OnSelectCurrencyData } from './swap.types';
import SwapButton from './swap-button';

const DEFAULT_UNKNOWN_DATA = {
  type: AddressZero,
  symbol: '???',
  name: 'Unknown',
  decimals: 0,
};

const Swap: FC = () => {
  const SUI =
    find(propEq('symbol', TOKEN_SYMBOL.SUI), DEX_TOKENS_DATA) ??
    DEFAULT_UNKNOWN_DATA;

  const ETH =
    find(propEq('symbol', TOKEN_SYMBOL.ETH), DEX_TOKENS_DATA) ??
    DEFAULT_UNKNOWN_DATA;

  const [tokenInType, setTokenInType] = useState(SUI.type);
  const [tokenOutType, setTokenOutType] = useState(ETH.type);
  const [isTokenInOpenModal, setTokenInIsOpenModal] = useState(false);
  const [isTokenOutOpenModal, setTokenOutIsOpenModal] = useState(false);

  const { register, setValue, getValues } = useForm<ISwapForm>({
    defaultValues: {
      tokenIn: {
        type: SUI.type,
        value: '0',
        decimals: SUI.decimals,
        symbol: SUI.symbol,
        setByUser: false,
      },
      tokenOut: {
        type: ETH.type,
        value: '0',
        decimals: ETH.decimals,
        symbol: ETH.symbol,
        setByUser: false,
      },
    },
  });

  const flipTokens = () => {
    const aux = tokenOutType;
    setTokenOutType(tokenInType);
    setTokenInType(aux);
  };

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') =>
    ({ type, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.type`, type);
      setValue(`${name}.decimals`, decimals);
      setValue(`${name}.symbol`, symbol);
      setValue('tokenOut.value', '0.0');
      setValue('tokenIn.value', '0.0');
      isTokenInOpenModal && setTokenInIsOpenModal(false);
      isTokenOutOpenModal && setTokenOutIsOpenModal(false);
    };

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
        <Box color="text" width="100%" display="grid" gridGap="1rem">
          <Box
            py="L"
            display="flex"
            borderRadius="M"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <InputBalance
              balance={0}
              max="1000"
              name="tokenIn"
              register={register}
              setValue={setValue}
              disabled={false}
              handleSelectedByUser={() => {
                setValue(`tokenIn.setByUser`, true);
                setValue(`tokenOut.setByUser`, false);
              }}
              currencySelector={
                <SwapSelectCurrency
                  currentToken={tokenInType}
                  isModalOpen={isTokenInOpenModal}
                  type={getValues('tokenIn.type')}
                  symbol={getValues('tokenIn.symbol')}
                  setIsModalOpen={setTokenInIsOpenModal}
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
              balance={0}
              name="tokenOut"
              register={register}
              setValue={setValue}
              handleSelectedByUser={() => {
                setValue(`tokenIn.setByUser`, false);
                setValue(`tokenOut.setByUser`, true);
              }}
              currencySelector={
                <SwapSelectCurrency
                  currentToken={tokenOutType}
                  isModalOpen={isTokenOutOpenModal}
                  symbol={getValues('tokenOut.symbol')}
                  type={getValues('tokenOut.type')}
                  setIsModalOpen={setTokenOutIsOpenModal}
                  onSelectCurrency={onSelectCurrency('tokenOut')}
                />
              }
            />
          </Box>
        </Box>
        {/* {(isFetchingAmountOutTokenOut || isFetchingAmountOutTokenIn) && (
          <SwapMessage {...SWAP_MESSAGES['loading-amount']} />
        )}
        {amountOutError && (
          <SwapMessage {...SWAP_MESSAGES['error-amount-out']} />
        )} */}
        {/* {balancesError && <SwapMessage {...SWAP_MESSAGES['error-balances']} />} */}
        {/* {tokenInType == tokenOutType && (
          <SwapMessage {...SWAP_MESSAGES['error-same-token']} />
        )}
        {hasNoMarket && <SwapMessage {...SWAP_MESSAGES['info-no-pool']} />} */}
        <SwapButton />
      </Box>

      {/* <SwapManager
        control={control}
        setValue={setValue}
        isFetchingAmountOutTokenIn={isFetchingAmountOutTokenIn}
        isFetchingAmountOutTokenOut={isFetchingAmountOutTokenOut}
        hasNoMarket={hasNoMarket}
        setHasNoMarket={setHasNoMarket}
        setFetchingAmountOutTokenIn={setFetchingAmountOutTokenIn}
        setFetchingAmountOutTokenOut={setFetchingAmountOutTokenOut}
        setSwapBase={setSwapBase}
        setAmountOutError={setAmountOutError}
      /> */}
    </>
  );
};

export default Swap;
