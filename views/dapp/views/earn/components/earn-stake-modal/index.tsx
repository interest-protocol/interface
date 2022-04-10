import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Modal, Typography } from '@/elements';
import { formatMoney } from '@/utils';

import {
  TOKENS_CURRENCY,
  TOKENS_ICONS,
  VALID_TOKENS,
} from './earn-stake-moda.data';
import { TToken } from './earn-stake-modal.types';
import InputStake from './input-stake';

const EarnStakeModal: FC = () => {
  const balance = 0.00055555;
  const {
    push,
    pathname,
    query: { modal, token },
  } = useRouter();

  const handleClose = () => push(pathname, undefined, { shallow: true });

  const { isOpen, isStake } = useMemo(
    () => ({
      isOpen: modal === 'stake' || modal === 'unstake',
      isStake: modal === 'stake',
    }),
    [modal]
  );

  if (isOpen && !VALID_TOKENS.includes(token as TToken)) handleClose();

  const Icon = TOKENS_ICONS[token as TToken];

  return (
    <Modal
      background="#0008"
      modalProps={{
        isOpen,
        shouldCloseOnEsc: true,
        onRequestClose: handleClose,
        shouldCloseOnOverlayClick: true,
      }}
    >
      <Box
        py="L"
        px="XL"
        color="text"
        bg="foreground"
        borderRadius="L"
        minWidth="20rem"
      >
        <Typography variant="normal" textAlign="center" fontSize="L">
          {isStake ? 'Stake' : 'Unstake'} {token} token
        </Typography>
        <Box mt="XL">
          <InputStake
            currencyPrefix={
              <Box display="flex" alignItems="center">
                {Array.isArray(Icon) ? (
                  <Box display="inline-flex">
                    {Icon.map((SVG, index) => (
                      <Box
                        key={v4()}
                        zIndex={Icon.length - index}
                        ml={index != 0 ? '-0.5rem' : 'NONE'}
                      >
                        <SVG width="1.6rem" height="1.6rem" />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Icon width="1.6rem" height="1.6rem" />
                )}
                <Typography variant="normal" ml="M">
                  {TOKENS_CURRENCY[token as TToken]}
                </Typography>
              </Box>
            }
            label={`Amount ${isStake ? 'stake' : 'unstake'}`}
          />
        </Box>
        <Box mt="XL">
          <Typography variant="normal" textTransform="uppercase">
            {isStake ? 'Your balance' : 'You staked'}:
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="normal" my="L">
              {token} Token
            </Typography>
            <Typography variant="normal" my="L">
              {formatMoney(balance)} {token}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mt="L" mb="M">
          <Button
            variant="primary"
            bg="bottomBackground"
            onClick={handleClose}
            hover={{ bg: 'textSoft' }}
          >
            Cancel
          </Button>
          <Button
            ml="L"
            flex="1"
            variant="primary"
            hover={{ bg: 'accentActive' }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EarnStakeModal;
