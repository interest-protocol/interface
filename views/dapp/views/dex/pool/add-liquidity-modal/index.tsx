import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Modal, Typography } from '@/elements';
import { ModalProps } from '@/interface';
import { WalletGuardButton } from '@/views/dapp/components';

import LiquidityDepositAmount from '../../components/liquidity-deposit-amount';
import { ILiquidityForm } from '../pool.types';

const AddLiquidity: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { setValue, control, register } = useForm<ILiquidityForm>({
    defaultValues: {
      pairItem1: {
        address: '',
        value: '0.0',
      },
      pairItem2: {
        address: '',
        value: '0.0',
      },
    },
  });

  // const onSelectCurrency =
  //   (name: 'pairItem1' | 'pairItem2') => (address: string) =>
  //     setValue(`${name}.address`, address);

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
        <Box my="L" width="100%" fontWeight="500">
          {[1, 2].map((_, index) => (
            <LiquidityDepositAmount
              key={v4()}
              control={control}
              setValue={setValue}
              register={register}
              name={`pairItem${index ? '2' : '1'}`}
            />
          ))}
        </Box>
        <WalletGuardButton>
          <Button variant="primary" width="100%" hover={{ bg: 'accentActive' }}>
            Deposit
          </Button>
        </WalletGuardButton>
      </Box>
    </Modal>
  );
};

export default AddLiquidity;
