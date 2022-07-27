import { ethers } from 'ethers';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { VAULT_TOKENS } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { useIdAccount } from '@/hooks/use-id-account';
import { TOKEN_SYMBOL } from '@/sdk';
import { BackSVG, TimesSVG } from '@/svg';

import InputBalance from './input-balance';
import ZapInputSelectCurrency from './input-balance/zap-input-select-currency';
import { IZapForm, ZapModalProps } from './zap.types';
import ZapSelectCurrency from './zap-select-currency';

const ZapModal: FC<ZapModalProps> = ({ isOpen, handleClose }) => {
  const { chainId } = useIdAccount();

  const { register, getValues, setValue } = useForm<IZapForm>({
    defaultValues: {
      currency: TOKEN_SYMBOL.BTC,
      value: 0,
    },
  });

  const VAULT_TOKEN = useMemo(
    () => (chainId && VAULT_TOKENS[chainId] ? VAULT_TOKENS[chainId] : []),
    [chainId]
  );

  const onSelectCurrency = (currency: TOKEN_SYMBOL) => {
    setValue('currency', currency);
    setValue('value', 0);
  };
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
        px="2rem"
        pb="2rem"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="34.125rem"
        maxWidth="38.125rem"
        borderRadius="M"
      >
        <Box
          height="3.25rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="normal"
            textAlign="center"
            fontSize="1rem"
            fontWeight="600"
            color="textSecondary"
          >
            PancakeSwap
          </Typography>
        </Box>
        <Box pt="XL">
          <Box display="flex" mb="XXL" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Typography
                variant="normal"
                fontSize="0.875rem"
                mb="0.25rem"
                color="textSecondary"
                lineHeight="1rem"
              >
                Zap uses pancakeswap *no extra fee
              </Typography>
              <Typography
                variant="normal"
                fontWeight="700"
                fontSize="1.5rem"
                color="textSecondary"
                lineHeight="1.75rem"
              >
                Zap helps token conversion
              </Typography>
            </Box>
            <Box
              width="2rem"
              height="2rem"
              display="flex"
              cursor="pointer"
              borderRadius="S"
              alignItems="center"
              justifyContent="center"
              onClick={handleClose}
            >
              <TimesSVG width="100%" height="100%" />
            </Box>
          </Box>
          <Box>
            <InputBalance
              name="value"
              register={register}
              label={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  color="textSecondary"
                  fontWeight="500"
                >
                  <Typography
                    as="label"
                    fontSize="1rem"
                    variant="normal"
                    display="inline-block"
                  >
                    From
                  </Typography>
                  <Typography
                    as="span"
                    fontSize="1rem"
                    variant="normal"
                    display="inline-block"
                  >
                    Balance: 0.000
                  </Typography>
                </Box>
              }
              getValues={getValues}
              currencyPrefix={
                <ZapInputSelectCurrency
                  defaultValue={TOKEN_SYMBOL.BTC}
                  onSelectCurrency={onSelectCurrency}
                />
              }
              setValue={setValue}
            />
            <Box
              width="2rem"
              height="2rem"
              borderRadius="S"
              transform="rotate(270deg)"
              mx="auto"
              mb="0.5rem"
              mt="2rem"
            >
              <BackSVG width="100%" height="100%" />
            </Box>
            <ZapSelectCurrency
              tokens={VAULT_TOKEN}
              label={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  color="textSecondary"
                  fontWeight="500"
                >
                  <Typography
                    as="label"
                    fontSize="1rem"
                    variant="normal"
                    display="inline-block"
                  >
                    To
                  </Typography>
                  <Typography
                    as="span"
                    fontSize="1rem"
                    variant="normal"
                    display="inline-block"
                  >
                    Balance: 0.000 BUNNY
                  </Typography>
                </Box>
              }
              defaultValue={
                VAULT_TOKEN?.[0]?.address ?? ethers.constants.AddressZero
              }
              onSelectCurrency={
                onSelectCurrency as (
                  currency: string,
                  callback?: (() => void) | undefined
                ) => void
              }
            />
            <Box bg="background" height="4.5rem" display="none"></Box>

            <Button variant="primary" width="100%" mt="1.5rem">
              ZAP
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ZapModal;
