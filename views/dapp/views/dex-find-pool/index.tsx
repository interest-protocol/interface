import { useRouter } from 'next/router';
import { prop } from 'ramda';
import { FC, useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  addAllowance,
  addERC20Liquidity,
  addNativeTokenLiquidity,
  isInterestDexPair,
} from '@/api';
import { Container } from '@/components';
import { CHAINS, ERC_20_DATA, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import {
  useChainId,
  useGetDexAllowancesAndBalances,
  useGetSigner,
} from '@/hooks';
import {
  getIPXPairAddress,
  sortTokens,
  TOKEN_SYMBOL,
  ZERO_ADDRESS,
} from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { getNativeBalance } from '@/state/core/core.selectors';
import {
  getInterestDexRouterAddress,
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
import { DexFindPoolForm } from './dex-find-pool.types';
import FindPool from './find-pool';

const FindPoolView: FC = () => {
  const { signer, account } = useGetSigner();
  const chainId = useChainId();

  const { push } = useRouter();

  const [isTokenAOpenModal, setTokenAIsOpenModal] = useState(false);
  const [isTokenBOpenModal, setTokenBIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreatePairUI, setShowCreatePairUI] = useState(false);

  const { setValue, control, register, getValues } = useForm<DexFindPoolForm>({
    defaultValues: {
      tokenA: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].symbol,
        value: '0',
      },
      tokenB: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.ETH].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.ETH].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.ETH].symbol,
        value: '0',
      },
      isStable: false,
    },
  });

  // We want the form to re-render if addresses change
  const tokenAAddress = useWatch({ control, name: 'tokenA.address' });
  const tokenBAddress = useWatch({ control, name: 'tokenB.address' });

  const { balancesError, balancesData } = useGetDexAllowancesAndBalances(
    chainId,
    tokenAAddress || ZERO_ADDRESS,
    tokenBAddress || ZERO_ADDRESS
  );

  const nativeBalance = useSelector(getNativeBalance) as string;
  const dispatch = useDispatch();

  const [token0Address, token1Address] = sortTokens(
    tokenAAddress,
    tokenBAddress
  );

  const isToken0Native = isZeroAddress(token0Address);

  const token0NeedsAllowance = isToken0Native
    ? false
    : balancesData.token0Allowance.isZero();

  const token1NeedsAllowance = balancesData.token1Allowance.isZero();

  const onSelectCurrency =
    (name: 'tokenA' | 'tokenB') =>
    ({ address, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.address`, address);
      setValue(`${name}.decimals`, decimals);
      setValue(`${name}.symbol`, symbol);
      setTokenAIsOpenModal(false);
      setTokenBIsOpenModal(false);
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

      setShowCreatePairUI(true);
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
      const token1 = isSameAddress(token0Address, tokenA.address)
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

  const approve = useCallback(
    async (token: string) => {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      try {
        const tx = await addAllowance(
          validId,
          validSigner,
          account,
          token,
          getInterestDexRouterAddress(validId)
        );

        await showTXSuccessToast(tx, validId);
      } catch (e) {
        throwError('Failed to approve', e);
      } finally {
        dispatch(coreActions.updateNativeBalance());
      }
    },
    [chainId, signer]
  );

  const handleApprove = (token: string) =>
    showToast(approve(token), {
      loading: 'Giving allowance...',
      success: 'Success!',
      error: prop('message'),
    });

  if (balancesError) return <div>Failed to connect to the blockchain</div>;

  if (showCreatePairUI)
    return (
      <div>
        <h1>pair does not exist</h1>
        <div>1 BTC ==20 usdc</div>
        {token0NeedsAllowance && (
          <button onClick={() => handleApprove(token0Address)}>
            add allowance to token0
          </button>
        )}
        {token1NeedsAllowance && (
          <button onClick={() => handleApprove(token1Address)}>
            add allowance to token1
          </button>
        )}
        <button onClick={handleCreatePair}>create pair</button>
      </div>
    );

  return (
    <Container py="XL">
      <GoBack routeBack />
      <Typography variant="normal" width="100%">
        Find Pool
      </Typography>
      <Box
        p="L"
        my="L"
        color="text"
        width="100%"
        bg="foreground"
        maxWidth="30rem"
        borderRadius="M"
      >
        <FindPool
          name={'tokenA'}
          control={control}
          setValue={setValue}
          register={register}
          currencyChargerArgs={{
            isModalOpen: isTokenAOpenModal,
            symbol: getValues('tokenA.symbol'),
            setIsModalOpen: setTokenAIsOpenModal,
            onSelectCurrency: onSelectCurrency('tokenA'),
          }}
        />
        <FindPool
          name={'tokenB'}
          control={control}
          setValue={setValue}
          register={register}
          currencyChargerArgs={{
            isModalOpen: isTokenBOpenModal,
            symbol: getValues('tokenB.symbol'),
            setIsModalOpen: setTokenBIsOpenModal,
            onSelectCurrency: onSelectCurrency('tokenB'),
          }}
        />
        <Box mt="XL">
          <WalletGuardButton>
            <Button
              width="100%"
              variant="primary"
              hover={{ bg: 'accentActive' }}
              onClick={handleEnterPool}
            >
              Enter Pool
            </Button>
          </WalletGuardButton>
        </Box>
      </Box>
    </Container>
  );
};

export default FindPoolView;
