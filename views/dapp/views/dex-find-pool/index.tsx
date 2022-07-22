import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { ERC_20_DATA, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { getIPXPairAddress, TOKEN_SYMBOL } from '@/sdk';
import { WalletGuardButton } from '@/views/dapp/components';

import GoBack from '../../components/go-back';
import { OnSelectCurrencyData } from '../dex/swap/swap.types';
import { DexFindPoolForm } from './dex-find-pool.types';
import FindPool from './find-pool';

const FindPoolView: FC = () => {
  const { chainId } = useIdAccount();
  const { push } = useRouter();

  const [isTokenAOpenModal, setTokenAIsOpenModal] = useState(false);
  const [isTokenBOpenModal, setTokenBIsOpenModal] = useState(false);

  const { setValue, control, register, getValues } = useForm<DexFindPoolForm>({
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

  const onSelectCurrency =
    (name: 'tokenA' | 'tokenB') =>
    ({ address, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.address`, address);
      setValue(`${name}.decimals`, decimals);
      setValue(`${name}.symbol`, symbol);
      setTokenAIsOpenModal(false);
      setTokenBIsOpenModal(false);
    };

  const handleEnterPool = () => {
    const { tokenA, tokenB, isStable } = getValues();

    const address = getIPXPairAddress(
      chainId,
      tokenA.address,
      tokenB.address,
      isStable
    );

    push({
      pathname: Routes[RoutesEnum.DEXPoolDetails],
      query: address,
    }).then();
  };

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
