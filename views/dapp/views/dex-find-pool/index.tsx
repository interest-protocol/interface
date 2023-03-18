import { getAddress } from 'ethers/lib/utils';
import { useTranslations } from 'next-intl';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { useGetDexAllowancesAndBalances } from '@/hooks';
import { ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { TimesSVG } from '@/svg';
import { GAPage } from '@/utils/analytics';

import GoBack from '../../components/go-back';
import { OnSelectCurrencyData } from '../dex/swap/swap.types';
import CreatePool from './create-pool';
import { FindPoolViewProps } from './dex-find-pool.types';
import FindPool from './find-pool';
import FindPoolButton from './find-pool-button';

const FindPoolView: FC<FindPoolViewProps> = ({
  chainId,
  account,
  formFindPool,
  isCreatingPairState,
  isTokenAOpenModalState,
  isTokenBOpenModalState,
  loadingState,
  createPoolPopupState,
}) => {
  const t = useTranslations();

  // We want the form to re-render if addresses change
  const tokenAAddress = useWatch({
    control: formFindPool.control,
    name: 'tokenA.address',
  });
  const isStable = useWatch({
    control: formFindPool.control,
    name: 'isStable',
  });
  const tokenBAddress = useWatch({
    control: formFindPool.control,
    name: 'tokenB.address',
  });

  const { balancesError, balancesData, nativeBalance, refetch } =
    useGetDexAllowancesAndBalances(
      chainId,
      tokenAAddress || ZERO_ADDRESS,
      tokenBAddress || ZERO_ADDRESS,
      GAPage.DexFindPool
    );

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
      formFindPool.setValue(`${name}.address`, address);
      formFindPool.setValue(`${name}.decimals`, decimals);
      formFindPool.setValue(`${name}.symbol`, symbol);
      formFindPool.setValue('tokenA.value', '0.0');
      formFindPool.setValue('tokenB.value', '0.0');
      isTokenAOpenModalState.setTokenAIsOpenModal(false);
      isTokenBOpenModalState.setTokenBIsOpenModal(false);
      isCreatingPairState.setCreatingPair(false);
    };

  if (balancesError)
    return (
      <Container py="XXL">
        <Box textAlign="center">
          <Box color="error">
            <TimesSVG width="10rem" maxHeight="10rem" maxWidth="10rem" />
          </Box>
          {t('dexPoolFind.balanceError')}
        </Box>
      </Container>
    );

  return (
    <Container py="XL" dapp>
      <GoBack routeBack />
      <Typography variant="normal" width="100%">
        {t('dexPoolFind.title')}
      </Typography>
      <FindPool
        control={formFindPool.control}
        setValue={formFindPool.setValue}
        currencyASelectArgs={{
          isModalOpen: isTokenAOpenModalState.isTokenAOpenModal,
          symbol: formFindPool.getValues('tokenA.symbol'),
          address: formFindPool.getValues('tokenA.address'),
          setIsModalOpen: isTokenAOpenModalState.setTokenAIsOpenModal,
          onSelectCurrency: onSelectCurrency('tokenA'),
        }}
        currencyBSelectArgs={{
          isModalOpen: isTokenBOpenModalState.isTokenBOpenModal,
          symbol: formFindPool.getValues('tokenB.symbol'),
          address: formFindPool.getValues('tokenB.address'),
          setIsModalOpen: isTokenBOpenModalState.setTokenBIsOpenModal,
          onSelectCurrency: onSelectCurrency('tokenB'),
        }}
        setCreatingPair={isCreatingPairState.setCreatingPair}
      />
      {isCreatingPairState.isCreatingPair && (
        <CreatePool
          getValues={formFindPool.getValues}
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
          control={formFindPool.control}
          register={formFindPool.register}
          needAllowance={[tokenANeedsAllowance, tokenBNeedsAllowance]}
          setValue={formFindPool.setValue}
          refetch={refetch}
        />
      )}
      <FindPoolButton
        chainId={chainId}
        account={account}
        control={formFindPool.control}
        getValues={formFindPool.getValues}
        tokenAAddress={tokenAAddress}
        tokenBAddress={tokenBAddress}
        isStable={isStable}
        nativeBalance={nativeBalance}
        balancesData={balancesData}
        setCreatingPair={isCreatingPairState.setCreatingPair}
        isCreatingPair={isCreatingPairState.isCreatingPair}
        loadingState={loadingState}
        createPoolPopupState={createPoolPopupState}
      />
    </Container>
  );
};

export default FindPoolView;
