import { getAddress } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { pathOr, prop } from 'ramda';
import { FC, useState } from 'react';

import { isInterestDexPair } from '@/api';
import {
  Routes,
  RoutesEnum,
  STABLE_COIN_ADDRESSES,
  WRAPPED_NATIVE_TOKEN,
} from '@/constants';
import { Box, Button } from '@/elements';
import { getIPXPairAddress, sortTokens, ZERO_BIG_NUMBER } from '@/sdk';
import {
  capitalize,
  handleZeroWrappedToken,
  isSameAddressZ,
  isZeroAddress,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';
import CreatePoolPopup from '@/views/dapp/views/dex-find-pool/create-pool-popup';
import { useAddLiquidity } from '@/views/dapp/views/dex-find-pool/dex-find-pool.hooks';

import { FindPoolButtonProps } from './dex-find-pool.types';

const FindPoolButton: FC<FindPoolButtonProps> = ({
  chainId,
  account,
  balancesData,
  getValues,
  nativeBalance,
  tokenBAddress,
  tokenAAddress,
  isStable,
  control,
  isCreatingPair,
  setCreatingPair,
}) => {
  const [loading, setLoading] = useState(false);
  const [createPoolPopup, setCreatePoolPopup] = useState(false);
  const t = useTranslations();
  const { push } = useRouter();

  const { writeAsync: addLiquidity } = useAddLiquidity({
    control,
    account,
    chainId,
    nativeBalance,
    balancesData,
    isStable,
  });

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

  const enterPool = async () => {
    setLoading(true);

    try {
      const address = getIPXPairAddress(
        chainId,
        handleZeroWrappedToken(chainId, tokenAAddress),
        handleZeroWrappedToken(chainId, tokenBAddress),
        isStable
      );

      const doesPairExist = await isInterestDexPair(chainId, address);
      setLoading(false);

      if (doesPairExist)
        return await push({
          pathname: Routes[RoutesEnum.DEXPoolDetails],
          query: { pairAddress: address },
        }).then();

      setCreatingPair(true);
    } catch {
      throwError('Error connecting');
      setLoading(false);
    }
  };

  const handleEnterPool = () =>
    showToast(enterPool(), {
      loading: capitalize(t('common.check', { isLoading: 1 })),
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const createPair = async () => {
    const { tokenA, tokenB, isStable } = getValues();

    try {
      setLoading(true);
      setCreatePoolPopup(false);

      const [token0Address] = sortTokens(tokenA.address, tokenB.address);

      const token1 = isSameAddressZ(token0Address, tokenA.address)
        ? tokenB
        : tokenA;

      const tx = await addLiquidity?.();

      if (tx) await tx.wait(3);

      await showTXSuccessToast(tx, chainId);

      const address = getIPXPairAddress(
        chainId,
        isZeroAddress(token0Address)
          ? WRAPPED_NATIVE_TOKEN[chainId].address
          : token0Address,
        token1.address,
        isStable
      );

      return push({
        pathname: Routes[RoutesEnum.DEXPoolDetails],
        query: { pairAddress: address },
      }).then();
    } catch (e) {
      throwError(t('error.generic'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePair = () =>
    showToast(createPair(), {
      loading: t('dexPoolFind.buttonPool', { isLoading: 1 }),
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const bothTokensAreStableCoins = () => {
    const { tokenA, tokenB } = getValues();

    return (
      STABLE_COIN_ADDRESSES[chainId].includes(getAddress(tokenA.address)) &&
      STABLE_COIN_ADDRESSES[chainId].includes(getAddress(tokenB.address))
    );
  };

  const handleValidateCreatePair = async () => {
    if (isStable && bothTokensAreStableCoins()) return await handleCreatePair();
    if (!isStable && !bothTokensAreStableCoins())
      return await handleCreatePair();

    return setCreatePoolPopup(true);
  };

  return (
    <Box
      p="L"
      my="L"
      color="text"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
      width={['100%', '100%', '100%', '30rem']}
    >
      <WalletGuardButton>
        {isSameAddressZ(tokenAAddress, tokenBAddress) ? (
          <Button width="100%" variant="primary" disabled={true} bg="disabled">
            {t('dexPoolFind.buttonSameToken')}
          </Button>
        ) : isCreatingPair ? (
          <Button
            width="100%"
            variant="primary"
            disabled={
              loading ||
              tokenANeedsAllowance ||
              tokenBNeedsAllowance ||
              !addLiquidity
            }
            bg={
              tokenANeedsAllowance || tokenBNeedsAllowance
                ? 'disabled'
                : loading
                ? 'accentActive'
                : 'accent'
            }
            hover={{
              bg:
                loading ||
                tokenANeedsAllowance ||
                tokenBNeedsAllowance ||
                !addLiquidity
                  ? 'disabled'
                  : 'accentActive',
            }}
            onClick={
              loading || tokenANeedsAllowance || tokenBNeedsAllowance
                ? undefined
                : handleValidateCreatePair
            }
          >
            {t('dexPoolFind.buttonPool', { isLoading: Number(loading) })}
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
            {t('dexPoolFind.button', { isLoading: Number(loading) })}
          </Button>
        )}
      </WalletGuardButton>
      <CreatePoolPopup
        isStable={isStable}
        isOpen={createPoolPopup}
        symbol0={getValues('tokenA.symbol')}
        symbol1={getValues('tokenB.symbol')}
        onCancel={() => setCreatePoolPopup(false)}
        onContinue={handleCreatePair}
      />
    </Box>
  );
};

export default FindPoolButton;
