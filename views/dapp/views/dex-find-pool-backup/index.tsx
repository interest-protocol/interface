import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { ERC_20_DATA } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { WalletGuardButton } from '@/views/dapp/components';

import GoBack from '../../components/go-back';
import { OnSelectCurrencyData } from '../dex/swap/swap.types';
import { DexFindPoolForm } from './dex-find-pool.types';
import FindPool from './find-pool';

const FindPoolView: FC = () => {
  const { chainId } = useIdAccount();

  const [isTokenAOpenModal, setTokenAIsOpenModal] = useState(false);
  const [isTokenBOpenModal, setTokenBIsOpenModal] = useState(false);

  const { setValue, control, register, getValues } = useForm<DexFindPoolForm>({
    defaultValues: {
      tokenAAmount: '0.0',
      tokenBAmount: '0.0',
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

  return (
    <Container py="XL">
      <GoBack routeBack />
      <Typography variant="normal" width="100%">
        Find Pool
      </Typography>
      <FindPool
        control={control}
        setValue={setValue}
        register={register}
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
      <Box
        p="L"
        my="L"
        color="text"
        width="100%"
        bg="foreground"
        maxWidth="30rem"
        borderRadius="M"
      >
        <Box mt="XL">
          <WalletGuardButton>
            <Button
              width="100%"
              variant="primary"
              hover={{ bg: 'accentActive' }}
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
