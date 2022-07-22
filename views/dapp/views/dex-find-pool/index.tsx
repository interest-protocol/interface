import { useRouter } from 'next/router';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { isInterestDexPair } from '@/api/interest-dex-factory';
import {
  addERC20Liquidity,
  addNativeTokenLiquidity,
} from '@/api/interest-dex-router';
import { Container } from '@/components';
import { CHAINS, ERC_20_DATA, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import {
  useGetDexAllowancesAndBalances,
  useGetSigner,
  useIdAccount,
} from '@/hooks';
import {
  getIPXPairAddress,
  sortTokens,
  TOKEN_SYMBOL,
  ZERO_ADDRESS,
} from '@/sdk';
import { getNativeBalance } from '@/state/core/core.selectors';
import { TimesSVG } from '@/svg';
import {
  isSameAddress,
  isZeroAddress,
  showToast,
  showTXSuccessToast,
  stringToBigNumber,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import GoBack from '../../components/go-back';
import { OnSelectCurrencyData } from '../dex/swap/swap.types';
import CreatePool from './create-pool';
import { DexFindPoolForm } from './dex-find-pool.types';
import FindPool from './find-pool';

const FindPoolView: FC = () => {
  const { push } = useRouter();
  const { signer } = useGetSigner();
  const { chainId, account } = useIdAccount();

  const [loading, setLoading] = useState(false);
  const [isCreatingPair, setCreatingPair] = useState(false);
  const [isTokenAOpenModal, setTokenAIsOpenModal] = useState(false);
  const [isTokenBOpenModal, setTokenBIsOpenModal] = useState(false);

  const { setValue, control, getValues, register } = useForm<DexFindPoolForm>({
    defaultValues: {
      tokenA: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].symbol,
        value: '0.0',
      },
      tokenB: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].symbol,
        value: '0.0',
      },
      isStable: false,
    },
  }); // We want the form to re-render if addresses change
  const tokenAAddress = useWatch({ control, name: 'tokenA.address' });
  const tokenBAddress = useWatch({ control, name: 'tokenB.address' });

  const { balancesError, balancesData } = useGetDexAllowancesAndBalances(
    chainId,
    tokenAAddress || ZERO_ADDRESS,
    tokenBAddress || ZERO_ADDRESS
  );

  const nativeBalance = useSelector(getNativeBalance) as string;

  const [token0Address, token1Address] = sortTokens(
    tokenAAddress,
    tokenBAddress
  );

  const isToken0Native = isZeroAddress(token0Address);

  const tokenANeedsAllowance = isToken0Native
    ? false
    : balancesData.token0Allowance.isZero();

  const tokenBNeedsAllowance = balancesData.token1Allowance.isZero();

  const onSelectCurrency =
    (name: 'tokenA' | 'tokenB') =>
    ({ address, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.address`, address);
      setValue(`${name}.decimals`, decimals);
      setValue(`${name}.symbol`, symbol);
      setTokenAIsOpenModal(false);
      setTokenBIsOpenModal(false);
      setCreatingPair(false);
    };

  const enterPool = async () => {
    setLoading(true);
    const { tokenA, tokenB, isStable } = getValues();

    try {
      const address = getIPXPairAddress(
        chainId,
        tokenA.address,
        tokenB.address,
        isStable
      );

      const doesPairExist = await isInterestDexPair(chainId, address);

      if (doesPairExist)
        return push({
          pathname: Routes[RoutesEnum.DEXPoolDetails],
          query: address,
        }).then();

      setCreatingPair(true);
    } catch {
      throwError('Error connecting');
    } finally {
      setLoading(false);
    }
  };

  const handleEnterPool = () =>
    showToast(enterPool(), {
      loading: 'checking pool...',
      success: 'Success!',
      error: prop('message'),
    });

  const createPair = async () => {
    const { tokenA, tokenB, isStable } = getValues();

    try {
      setLoading(true);

      const { validSigner, validId } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const token0 = isSameAddress(token0Address, tokenA.address)
        ? tokenA
        : tokenB;

      const token1 = isSameAddress(token1Address, tokenA.address)
        ? tokenB
        : tokenA;

      const nativeBalanceBN = stringToBigNumber(
        nativeBalance,
        CHAINS[validId].nativeCurrency.decimals
      );

      const amount0 = stringToBigNumber(token0.value, token0.decimals);

      const amount1 = stringToBigNumber(token1.value, token1.decimals);

      const safeAmount1 = amount1.gt(balancesData.token1Balance)
        ? balancesData.token1Balance
        : amount1;

      // 5 minutes
      const deadline = new Date().getTime() + 5 * 60;

      if (isToken0Native) {
        const safeAmount0 = amount0.gt(nativeBalanceBN)
          ? nativeBalanceBN
          : amount0;

        const tx = await addNativeTokenLiquidity(
          validId,
          validSigner,
          safeAmount0,
          token1.address,
          isStable,
          safeAmount1,
          safeAmount1,
          safeAmount0,
          account,
          deadline
        );

        return await showTXSuccessToast(tx, validId);
      }

      const safeAmount0 = amount0.gt(balancesData.token0Balance)
        ? balancesData.token0Balance
        : amount0;

      const tx = await addERC20Liquidity(
        validId,
        validSigner,
        token0.address,
        tokenB.address,
        isStable,
        safeAmount0,
        safeAmount1,
        safeAmount0,
        safeAmount1,
        account,
        deadline
      );

      await showTXSuccessToast(tx, validId);
    } catch {
      throwError('Failed to create pair');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePair = () =>
    showToast(createPair(), {
      loading: 'Creating pool...',
      success: 'Success!',
      error: prop('message'),
    });

  if (balancesError)
    return (
      <Container py="XXL">
        <Box textAlign="center">
          <Box color="error">
            <TimesSVG width="10rem" />
          </Box>
          Failed to connect to the blockchain
        </Box>
      </Container>
    );

  return (
    <Container py="XL">
      <GoBack routeBack />
      <Typography variant="normal" width="100%">
        Find Pool
      </Typography>
      <FindPool
        control={control}
        setValue={setValue}
        currencyAChargerArgs={{
          isModalOpen: isTokenAOpenModal,
          symbol: getValues('tokenA.symbol'),
          setIsModalOpen: setTokenAIsOpenModal,
          onSelectCurrency: onSelectCurrency('tokenA'),
        }}
        currencyBChargerArgs={{
          isModalOpen: isTokenBOpenModal,
          symbol: getValues('tokenB.symbol'),
          setIsModalOpen: setTokenBIsOpenModal,
          onSelectCurrency: onSelectCurrency('tokenB'),
        }}
      />
      {isCreatingPair && (
        <CreatePool
          control={control}
          register={register}
          needAllowance={[tokenANeedsAllowance, tokenBNeedsAllowance]}
        />
      )}
      <Box
        p="L"
        my="L"
        color="text"
        width="100%"
        bg="foreground"
        maxWidth="30rem"
        borderRadius="M"
      >
        <WalletGuardButton>
          {isCreatingPair ? (
            <Button
              width="100%"
              variant="primary"
              disabled={loading}
              onClick={handleCreatePair}
              hover={{ bg: loading ? 'disabled' : 'accentActive' }}
            >
              Create Pool
            </Button>
          ) : (
            <Button
              width="100%"
              variant="primary"
              disabled={loading}
              onClick={handleEnterPool}
              hover={{ bg: loading ? 'disabled' : 'accentActive' }}
            >
              Find and Enter Pool
            </Button>
          )}
        </WalletGuardButton>
      </Box>
    </Container>
  );
};

export default FindPoolView;
