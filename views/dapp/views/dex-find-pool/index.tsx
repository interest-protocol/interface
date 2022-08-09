import { getAddress } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { pathOr, prop } from 'ramda';
import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { isInterestDexPair } from '@/api/interest-dex-factory';
import {
  addERC20Liquidity,
  addNativeTokenLiquidity,
} from '@/api/interest-dex-router';
import { Container } from '@/components';
import {
  ERC_20_DATA,
  Routes,
  RoutesEnum,
  WRAPPED_NATIVE_TOKEN,
} from '@/constants';
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
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { getNativeBalance } from '@/state/core/core.selectors';
import { TimesSVG } from '@/svg';
import {
  handleZeroWrappedToken,
  isSameAddressZ,
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
      },
      tokenB: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].symbol,
      },
      isStable: false,
    },
  });

  // We want the form to re-render if addresses change
  const tokenAAddress = useWatch({ control, name: 'tokenA.address' });
  const tokenBAddress = useWatch({ control, name: 'tokenB.address' });

  const { balancesError, balancesData, mutate } =
    useGetDexAllowancesAndBalances(
      chainId,
      tokenAAddress || ZERO_ADDRESS,
      tokenBAddress || ZERO_ADDRESS
    );

  const nativeBalance = useSelector(getNativeBalance) as string;

  const nativeBalanceBN = stringToBigNumber(nativeBalance);

  const tokenANeedsAllowance = pathOr(
    ZERO_BIG_NUMBER,
    [getAddress(tokenAAddress), 'allowance'],
    balancesData
  ).isZero();

  const tokenBNeedsAllowance = pathOr(
    ZERO_BIG_NUMBER,
    [getAddress(tokenBAddress), 'allowance'],
    balancesData
  ).isZero();

  const onSelectCurrency =
    (name: 'tokenA' | 'tokenB') =>
    ({ address, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.address`, address);
      setValue(`${name}.decimals`, decimals);
      setValue(`${name}.symbol`, symbol);
      setValue('tokenA.value', '0.0');
      setValue('tokenB.value', '0.0');
      setTokenAIsOpenModal(false);
      setTokenBIsOpenModal(false);
      setCreatingPair(false);
    };

  const enterPool = async () => {
    setLoading(true);
    const { isStable } = getValues();

    try {
      const address = getIPXPairAddress(
        chainId,
        handleZeroWrappedToken(chainId, tokenAAddress),
        handleZeroWrappedToken(chainId, tokenBAddress),
        isStable
      );

      const doesPairExist = await isInterestDexPair(chainId, address);

      if (doesPairExist)
        return push({
          pathname: Routes[RoutesEnum.DEXPoolDetails],
          query: { pairAddress: address },
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
      loading: 'Checking pool...',
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

      const [token0Address] = sortTokens(tokenA.address, tokenB.address);

      const token0 = isSameAddressZ(token0Address, tokenA.address)
        ? tokenA
        : tokenB;

      const token1 = isSameAddressZ(token0Address, tokenA.address)
        ? tokenB
        : tokenA;

      const amount0 = stringToBigNumber(token0.value, token0.decimals);

      const amount1 = stringToBigNumber(token1.value, token1.decimals);

      if (amount0.isZero() || amount1.isZero()) throwError('No zero amount');

      const token1UserBalance = pathOr(
        ZERO_BIG_NUMBER,
        [getAddress(token1.address), 'balance'],
        balancesData
      );

      const safeAmount1 = amount1.gt(token1UserBalance)
        ? token1UserBalance
        : amount1;

      // 5 minutes
      const deadline = Math.ceil((new Date().getTime() + 5 * 60 * 1000) / 1000);

      if (isZeroAddress(token0.address)) {
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

        await showTXSuccessToast(tx, validId);
        const address = getIPXPairAddress(
          chainId,
          WRAPPED_NATIVE_TOKEN[chainId].address,
          token1.address,
          isStable
        );

        return push({
          pathname: Routes[RoutesEnum.DEXPoolDetails],
          query: { pairAddress: address },
        }).then();
      }

      const token0UserBalance = pathOr(
        ZERO_BIG_NUMBER,
        [getAddress(token0.address), 'balance'],
        balancesData
      );

      const safeAmount0 = amount0.gt(token0UserBalance)
        ? token0UserBalance
        : amount0;

      const tx = await addERC20Liquidity(
        validId,
        validSigner,
        token0.address,
        token1.address,
        isStable,
        safeAmount0,
        safeAmount1,
        safeAmount0,
        safeAmount1,
        account,
        deadline
      );

      await showTXSuccessToast(tx, validId);

      const address = getIPXPairAddress(
        chainId,
        token0Address,
        token1.address,
        isStable
      );

      return push({
        pathname: Routes[RoutesEnum.DEXPoolDetails],
        query: { pairAddress: address },
      }).then();
    } catch (e) {
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
          getValues={getValues}
          update={mutate}
          tokenBalances={[
            pathOr(
              ZERO_BIG_NUMBER,
              [getAddress(tokenAAddress), 'balance'],
              balancesData
            ),
            pathOr(
              ZERO_BIG_NUMBER,
              [getAddress(tokenBAddress), 'balance'],
              balancesData
            ),
          ]}
          control={control}
          register={register}
          needAllowance={[tokenANeedsAllowance, tokenBNeedsAllowance]}
          setValue={setValue}
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
          {isSameAddressZ(tokenAAddress, tokenBAddress) ? (
            <Button
              width="100%"
              variant="primary"
              disabled={true}
              bg="disabled"
            >
              Choose different tokens
            </Button>
          ) : isCreatingPair ? (
            <Button
              width="100%"
              variant="primary"
              disabled={loading || tokenANeedsAllowance || tokenBNeedsAllowance}
              bg={
                tokenANeedsAllowance || tokenBNeedsAllowance
                  ? 'disabled'
                  : loading
                  ? 'accentActive'
                  : 'accent'
              }
              hover={{
                bg:
                  loading || tokenANeedsAllowance || tokenBNeedsAllowance
                    ? 'disabled'
                    : 'accentActive',
              }}
              onClick={
                loading || tokenANeedsAllowance || tokenBNeedsAllowance
                  ? undefined
                  : handleCreatePair
              }
            >
              {loading ? 'Creating Pool...' : 'Create Pool'}
            </Button>
          ) : (
            <Button
              width="100%"
              variant="primary"
              disabled={loading}
              onClick={handleEnterPool}
              bg={loading ? 'accentActive' : 'accent'}
              hover={{ bg: loading ? 'disabled' : 'accentActive' }}
            >
              {loading ? 'Finding Pool...' : 'Find and Enter Pool'}
            </Button>
          )}
        </WalletGuardButton>
      </Box>
    </Container>
  );
};

export default FindPoolView;
