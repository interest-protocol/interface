import { useTranslations } from 'next-intl';
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
        type: AddressZero,
        decimals: 0.0023,
        symbol: '???',
      },
      tokenB: {
        type: AddressZero,
        decimals: 0.0023,
        symbol: '???',
      },
    },
  });

  // We want the form to re-render if addresses change
  const tokenAType = useWatch({ control, name: 'tokenA.type' });
  const tokenBType = useWatch({ control, name: 'tokenB.type' });

  const tokenANeedsAllowance = false;

  const tokenBNeedsAllowance = false;

  const onSelectCurrency =
    (name: 'tokenA' | 'tokenB') =>
    ({ type, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.type`, type);
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
          type: getValues('tokenA.type'),
          setIsModalOpen: setTokenAIsOpenModal,
          onSelectCurrency: onSelectCurrency('tokenA'),
        }}
        currencyBSelectArgs={{
          isModalOpen: isTokenBOpenModal,
          symbol: getValues('tokenB.symbol'),
          type: getValues('tokenB.type'),
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
          tokenBalances={[12, 21]}
        />
      )}
      <FindPoolButton
        control={control}
        getValues={getValues}
        tokenAType={tokenAType}
        tokenBType={tokenBType}
        setCreatingPair={setCreatingPair}
        isCreatingPair={isCreatingPair}
      />
    </Container>
  );
};

export default FindPoolView;
