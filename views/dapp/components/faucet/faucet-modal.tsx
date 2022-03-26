import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Modal, Typography } from '@/elements';
import { useGetUserCurrency } from '@/hooks/use-get-user-currency';
import { BinanceSVG, TimesSVG } from '@/svg';
import { formatMoney } from '@/utils';

import { FaucetModalProps, IFaucetForm } from './faucet.types';
import FaucetSelectCurrency from './faucet-select-currency';
import InputMoney from './input-money';

const FaucetModal: FC<FaucetModalProps> = ({ isOpen, handleClose }) => {
  const { register } = useForm<IFaucetForm>({
    defaultValues: {
      currency: '',
      value: 0,
    },
  });

  const { amount } = useGetUserCurrency();

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
        py="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="22rem"
        maxWidth="26rem"
        borderRadius="M"
        px={['L', 'XL']}
      >
        <Box display="flex" justifyContent="flex-end">
          <Box
            mt="-4.5rem"
            mr="-1em"
            display="flex"
            textAlign="right"
            position="absolute"
            justifyContent="flex-end"
          >
            <Button
              px="L"
              variant="primary"
              onClick={handleClose}
              hover={{
                bg: 'accentActive',
              }}
            >
              <TimesSVG width="1rem" />
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="title3" fontWeight="normal">
            FAUCET
          </Typography>
          <Typography variant="normal" color="textSecondary" mt="S">
            Get test tokens
          </Typography>
        </Box>
        <Box my="XL">
          <InputMoney
            name="value"
            register={register}
            label="Choose token"
            amount={amount.toSignificant(4)}
            amountUSD={+amount.toSignificant(4)}
            currencyPrefix={<FaucetSelectCurrency />}
          />
        </Box>
        <Box my="XXL">
          <Typography variant="normal" textTransform="uppercase" mt="L">
            Your balance:
          </Typography>
          <Box display="flex" justifyContent="space-between" my="L">
            <Box display="flex">
              <BinanceSVG width="1rem" />
              <Typography ml="M" variant="normal">
                Binance Coin
              </Typography>
            </Box>
            <Typography variant="normal" color="textSecondary">
              {formatMoney(+amount.toSignificant(4))}
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Button
            width="100%"
            variant="primary"
            bg="accentAlternative"
            hover={{ bg: 'accentAlternativeActive' }}
          >
            Mint
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FaucetModal;
