import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Input, Modal, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import {
  MAIL_FAUCET_TOKENS,
  TOKENS_SVG_MAP,
} from '../../../../../constants/erc-20';
import { SwapModalProps } from '../components/settings/settings.types';
import { ISwapForm } from '../components/swap.types';
import SwapSelectCurrency from '../components/swap-select-currency';
import Pairs from './pairs';

const CreatePoolView: FC<SwapModalProps> = ({ isOpen, handleClose }) => {
  const [editHide, setEditHide] = useState(false);
  const [typeSelected, setTypeSelected] = useState('stable');
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
  const { getValues, setValue } = useForm<ISwapForm>({
    defaultValues: {
      currency: MAIL_FAUCET_TOKENS[4]?.[0]?.symbol ?? TOKEN_SYMBOL.Unknown,
      value: 0,
    },
  });
  const onSelectCurrency = (currency: string) => {
    setValue('currency', currency);
    setValue('value', 0);
  };
  const PAIRS = [
    {
      perceptual: '0.03',
      type: 'stable',
      perceptualSelect: '0',
      isSelect: false,
    },
    {
      perceptual: '0.3',
      type: 'most',
      perceptualSelect: '0',
      isSelect: false,
    },
    {
      perceptual: '1',
      type: 'exotic',
      perceptualSelect: '0',
      isSelect: false,
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
            Pool
          </Typography>
        </Box>
        <Typography variant="normal" width="100%" my="M" fontWeight="500">
          Select Pair
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <SwapSelectCurrency
            tokens={MAIL_FAUCET_TOKENS[4]}
            defaultValue={getValues('currency')}
            onSelectCurrency={onSelectCurrency}
          />
          <SwapSelectCurrency
            tokens={MAIL_FAUCET_TOKENS[4]}
            defaultValue={getValues('currency')}
            onSelectCurrency={onSelectCurrency}
          />
        </Box>
        <Box
          display="flex"
          border="0.1rem solid"
          borderColor="textSoft"
          p="M"
          my="L"
          borderRadius="1rem"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box height="100%">
            <Typography
              variant="normal"
              fontWeight="500"
              p="M"
              fontSize="0.9rem"
            >
              Fee tier
            </Typography>
            <Typography variant="normal" p="M" fontSize="0.8rem" mb="M">
              The % you will earn in fees.
            </Typography>
          </Box>
          <Button
            variant="secondary"
            height="100%"
            fontWeight="500"
            px="L"
            onClick={() => setEditHide(!editHide)}
          >
            {editHide ? 'Hide' : 'Edit'}
          </Button>
        </Box>
        {editHide && (
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            {PAIRS.map((item) => (
              <Pairs
                perceptual={item.perceptual}
                type={item.type}
                perceptualSelect={item.perceptualSelect}
                isSelect={item.type == typeSelected}
                setSelected={setTypeSelected}
                key={v4()}
              />
            ))}
          </Box>
        )}
        <Box my="L" width="100%" fontWeight="500">
          <Typography variant="normal">Deposit Amounts</Typography>
          {[1, 2].map(() => (
            <Box
              bg="background"
              pb="XL"
              pt="M"
              my="M"
              border="0.02rem solid"
              borderColor="bottomBackground"
              borderRadius="1.1rem"
              hover={{
                borderColor: 'textSoft',
              }}
              key={v4()}
            >
              <Input
                min="0"
                type="number"
                step="0.0001"
                placeholder={'0.0'}
                shieldProps={{
                  my: 'M',
                  height: '3rem',
                  overflow: 'visible',
                  borderColor: 'transparent',
                }}
                Suffix={
                  <Box
                    px="L"
                    display="flex"
                    borderRadius="2rem"
                    alignItems="center"
                    justifyContent="space-between"
                    height="100%"
                    bg="bottomBackground"
                    mr="L"
                    cursor="pointer"
                  >
                    <Box my="M" display="flex" alignItems="center">
                      <DefaultTokenSVG width="1rem" height="1rem" />
                      <Typography
                        mx="M"
                        as="span"
                        variant="normal"
                        hover={{ color: 'accent' }}
                        active={{ color: 'accentActive' }}
                      >
                        UNI
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              <Typography
                variant="normal"
                textAlign="end"
                mr="L"
                color="textSecondary"
                fontSize="0.9rem"
              >
                Balance: 0
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePoolView;
