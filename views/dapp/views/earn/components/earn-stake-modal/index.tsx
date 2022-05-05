import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { getFarmsSVG, StakeState } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { IntMath } from '@/sdk';
import { TimesSVG } from '@/svg';
import { safeToBigNumber } from '@/utils';

import { EarnStakeModalProps } from './earn-stake-modal.types';
import InputStake from './input-stake';

const EarnStakeModal: FC<EarnStakeModalProps> = ({
  poolId,
  modal,
  symbol,
  balance,
  onStake,
  onUnstake,
  handleClose,
}) => {
  const { handleSubmit, setValue, register } = useForm({
    defaultValues: {
      value: 0,
    },
  });

  const { isOpen, isStake } = useMemo(
    () => ({
      isOpen: modal === StakeState.Stake || modal === StakeState.Unstake,
      isStake: modal === StakeState.Stake,
    }),
    [modal]
  );

  const Icon = getFarmsSVG(poolId);

  const onSubmit = ({ value }: { value: number }) => {
    isStake
      ? onStake(safeToBigNumber(value))
      : onUnstake(safeToBigNumber(value));
  };

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
        as="form"
        color="text"
        bg="foreground"
        borderRadius="L"
        minWidth="20rem"
        onSubmit={handleSubmit(onSubmit)}
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
        <Typography variant="normal" textAlign="center" fontSize="L">
          {isStake ? 'Stake' : 'Unstake'} {symbol} token
        </Typography>
        <Box mt="XL">
          <InputStake
            register={register}
            setValue={setValue}
            balance={balance}
            currencyPrefix={
              <Box display="flex" alignItems="center">
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
                <Typography variant="normal" ml="M">
                  {symbol}
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
              {symbol} Token
            </Typography>
            <Typography variant="normal" my="L">
              {balance} {symbol}
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