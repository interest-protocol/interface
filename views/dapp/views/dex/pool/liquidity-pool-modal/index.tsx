import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { MAIL_FAUCET_TOKENS } from '@/constants/erc-20';
import { Box, Button, Modal, Typography } from '@/elements';
import { ModalProps } from '@/interface';

import SwapSelectCurrency from '../../components/swap-select-currency';
import { ILiquidityForm } from '../pool.types';
import LiquidityDepositAmount from './liquidity-desposit-amount';

const AddLiquidity: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { getValues, setValue, control } = useForm<ILiquidityForm>({
    defaultValues: {
      pairItem1: {
        address: MAIL_FAUCET_TOKENS[4][0].address,
        value: 0,
      },
      pairItem2: {
        address: MAIL_FAUCET_TOKENS[4][1].address,
        value: 0,
      },
    },
  });

  const onSelectCurrency =
    (name: 'pairItem1' | 'pairItem2') => (address: string) =>
      setValue(`${name}.address`, address);

  return (
    <Modal
      modalProps={{
        isOpen,
        shouldCloseOnEsc: true,
        onRequestClose: handleClose,
        shouldCloseOnOverlayClick: true,
      }}
      background="#0008"
    >
      <Box
        my="L"
        pb="L"
        px="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="30rem"
        borderRadius="M"
      >
        <Box
          py="L"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="normal" textAlign="center" width="100%">
            Add Liquidity
          </Typography>
        </Box>
        <Typography variant="normal" width="100%" my="M" fontWeight="500">
          Select Pair
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <SwapSelectCurrency
            tokens={MAIL_FAUCET_TOKENS[4]}
            defaultValue={getValues('pairItem1.address')}
            onSelectCurrency={onSelectCurrency('pairItem1')}
          />
          <SwapSelectCurrency
            fromRight
            tokens={MAIL_FAUCET_TOKENS[4]}
            defaultValue={getValues('pairItem2.address')}
            onSelectCurrency={onSelectCurrency('pairItem2')}
          />
        </Box>
        <Box my="L" width="100%" fontWeight="500">
          <Typography variant="normal">Deposit Amounts</Typography>
          {[1, 2].map((_, index) => (
            <LiquidityDepositAmount
              key={v4()}
              control={control}
              name={`pairItem${index ? '2' : '1'}`}
            />
          ))}
        </Box>
        <Button variant="primary" width="100%" hover={{ bg: 'accentActive' }}>
          Deposit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddLiquidity;
