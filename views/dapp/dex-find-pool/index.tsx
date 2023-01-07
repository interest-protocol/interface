import { useTranslations } from 'next-intl';
import { pathOr } from 'ramda';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Container } from '@/components';
import { Typography } from '@/elements';
import { AddressZero } from '@/sdk';

import GoBack from '../components/go-back';
import { OnSelectCurrencyData } from '../dex/swap/swap.types';
import CreatePool from './create-pool';
import { DexFindPoolForm } from './dex-find-pool.types';
import FindPool from './find-pool';
import FindPoolButton from './find-pool-button';

const FindPoolView = () => {
  const t = useTranslations();
  const [isCreatingPair, setCreatingPair] = useState(false);
  const [isTokenAOpenModal, setTokenAIsOpenModal] = useState(false);
  const [isTokenBOpenModal, setTokenBIsOpenModal] = useState(false);

  const { setValue, control, getValues, register } = useForm<DexFindPoolForm>({
    defaultValues: {
      tokenA: {
        address: AddressZero,
        decimals: 0.0023,
        symbol: 'BTC',
      },
      tokenB: {
        address: AddressZero,
        decimals: 0.0023,
        symbol: 'BTC',
      },
      isStable: false,
    },
  });

  // We want the form to re-render if addresses change
  const tokenAAddress = useWatch({ control, name: 'tokenA.address' });
  const isStable = useWatch({ control, name: 'isStable' });
  const tokenBAddress = useWatch({ control, name: 'tokenB.address' });

  const tokenANeedsAllowance = false;

  const tokenBNeedsAllowance = false;

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

  return (
    <Container py="XL" dapp>
      <GoBack routeBack />
      <Typography variant="normal" width="100%">
        {t('dexPoolFind.title')}
      </Typography>
      <FindPool
        control={control}
        setValue={setValue}
        currencyASelectArgs={{
          isModalOpen: isTokenAOpenModal,
          symbol: getValues('tokenA.symbol'),
          address: getValues('tokenA.address'),
          setIsModalOpen: setTokenAIsOpenModal,
          onSelectCurrency: onSelectCurrency('tokenA'),
        }}
        currencyBSelectArgs={{
          isModalOpen: isTokenBOpenModal,
          symbol: getValues('tokenB.symbol'),
          address: getValues('tokenB.address'),
          setIsModalOpen: setTokenBIsOpenModal,
          onSelectCurrency: onSelectCurrency('tokenB'),
        }}
        setCreatingPair={setCreatingPair}
      />
      {isCreatingPair && (
        <CreatePool
          getValues={getValues}
          control={control}
          register={register}
          needAllowance={[tokenANeedsAllowance, tokenBNeedsAllowance]}
          setValue={setValue}
        />
      )}
      <FindPoolButton
        chainId={chainId}
        account={account}
        control={control}
        getValues={getValues}
        tokenAAddress={tokenAAddress}
        tokenBAddress={tokenBAddress}
        isStable={isStable}
        nativeBalance={nativeBalance}
        balancesData={balancesData}
        setCreatingPair={setCreatingPair}
        isCreatingPair={isCreatingPair}
      />
    </Container>
  );
};

export default FindPoolView;
