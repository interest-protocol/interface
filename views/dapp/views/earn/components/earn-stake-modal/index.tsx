import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import { Box, Button, Modal, Typography } from '@/elements';
import { formatMoney } from '@/utils';

import InputStake from './input-stake';

const VALID_TOKENS = ['INT', 'LP'];
const TOKENS_CURRENCY = { INT: 'Interest Token', LP: 'BTC-DNR' };

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

  if (isOpen && !VALID_TOKENS.includes(token as string)) handleClose();

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
            currencyPrefix={TOKENS_CURRENCY[(token as 'INT') || 'LP']}
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
