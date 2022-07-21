import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Container } from '@/components';
import { ERC_20_DATA } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { WalletGuardButton } from '@/views/dapp/components';

import GoBack from '../../components/go-back';
import SwapSelectCurrency from '../dex/components/swap-select-currency';
import { ILiquidityForm } from '../dex/pool/pool.types';
import { OnSelectCurrencyData } from '../dex/swap/swap.types';
import LiquidityDepositAmount from './components/liquidity-deposit-amount';

const FindPool: FC = () => {
  const { chainId } = useIdAccount();
  const [isTokenInOpenModal, setTokenInIsOpenModal] = useState(false);
  const [isTokenOutOpenModal, setTokenOutIsOpenModal] = useState(false);

  const { setValue, control, register, getValues } = useForm<ILiquidityForm>({
    defaultValues: {
      tokenIn: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].symbol,
        value: '0.0',
      },
      tokenOut: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].address,
        decimals: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].decimals,
        symbol: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].symbol,
        value: '0.0',
      },
    },
  });

  // We want the form to re-render if addresses change
  const tokenInAddress = useWatch({ control, name: 'tokenIn.address' });
  const tokenOutAddress = useWatch({ control, name: 'tokenOut.address' });

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') =>
    ({ address, decimals, symbol }: OnSelectCurrencyData) => {
      setValue(`${name}.address`, address);
      setValue(`${name}.decimals`, decimals);
      setValue(`${name}.symbol`, symbol);
      setValue('tokenOut.value', '0.0');
      setValue('tokenIn.value', '0.0');
      setTokenInIsOpenModal(false);
      setTokenOutIsOpenModal(false);
    };

  return (
    <Container py="XL">
      <GoBack />
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
        <LiquidityDepositAmount
          name={'tokenIn'}
          control={control}
          setValue={setValue}
          register={register}
          CurrencyChanger={
            <SwapSelectCurrency
              currentToken={tokenInAddress}
              isModalOpen={isTokenInOpenModal}
              symbol={getValues('tokenIn.symbol')}
              setIsModalOpen={setTokenInIsOpenModal}
              onSelectCurrency={onSelectCurrency('tokenIn')}
            />
          }
        />
        <LiquidityDepositAmount
          name={'tokenOut'}
          control={control}
          setValue={setValue}
          register={register}
          CurrencyChanger={
            <SwapSelectCurrency
              currentToken={tokenOutAddress}
              isModalOpen={isTokenOutOpenModal}
              symbol={getValues('tokenOut.symbol')}
              setIsModalOpen={setTokenOutIsOpenModal}
              onSelectCurrency={onSelectCurrency('tokenOut')}
            />
          }
        />

        <Box mt="XL">
          <WalletGuardButton>
            <Button
              variant="primary"
              width="100%"
              hover={{ bg: 'accentActive' }}
            >
              Deposit
            </Button>
          </WalletGuardButton>
        </Box>
      </Box>
    </Container>
  );
};

export default FindPool;
