import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { LoadingSVG, TimesSVG } from '@/svg';

import { FaucetModalProps, IFaucetForm } from './faucet.types';
import InputBalance from './input-balance';

const MAILMarketPoolModal: FC<FaucetModalProps> = ({ isOpen, handleClose }) => {
  const [loading] = useState(false);

  const { register, getValues, setValue } = useForm<IFaucetForm>({
    defaultValues: {
      currency: TOKEN_SYMBOL.BTC,
      value: 0,
    },
  });

  const data = [
    {
      currency: {
        symbol: 'INT',
      },
      value: '80979',
    },
  ];

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
              <TimesSVG width="1rem" height="1rem" />
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
          <InputBalance
            name="value"
            register={register}
            label="Choose token"
            setValue={setValue}
            getValues={getValues}
          />
        </Box>
        <Box my="XXL">
          <Typography variant="normal" textTransform="uppercase" mt="L">
            Your balance:
          </Typography>
          {data.map((x) => {
            const SVG = TOKENS_SVG_MAP[x.currency.symbol];

            return (
              <Box
                key={v4()}
                display="flex"
                justifyContent="space-between"
                my="L"
              >
                <Box display="flex">
                  <SVG width="1rem" height="1rem" />
                  <Typography ml="M" variant="normal">
                    {x.value}
                  </Typography>
                </Box>
                <Typography variant="normal" color="textSecondary">
                  {x.currency.symbol}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box display="flex">
          <Button
            width="100%"
            variant="primary"
            disabled={loading}
            hover={{ bg: 'accentAlternativeActive' }}
            bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {loading ? (
              <Box as="span" display="flex" justifyContent="center">
                <LoadingSVG width="1rem" height="1rem" />
                <Typography as="span" variant="normal" ml="M" fontSize="S">
                  {type === 'borrow' ? 'Borrowing...' : 'Supplying...'}
                </Typography>
              </Box>
            ) : type === 'borrow' ? (
              'Borrow'
            ) : (
              'Supply'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MAILMarketPoolModal;
