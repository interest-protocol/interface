import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { getFarmsSVG, StakeState } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { LoadingSVG, TimesSVG } from '@/svg';
import { safeToBigNumber } from '@/utils';

import { EarnStakeModalProps } from './earn-stake-modal.types';
import InputStake from './input-stake';

const EarnStakeModal: FC<EarnStakeModalProps> = ({
  farm,
  modal,
  amount,
  loading,
  onStake,
  onUnstake,
  handleClose,
  farmSymbol,
}) => {
  const { handleSubmit, setValue, register } = useForm({
    defaultValues: { value: '0' },
  });

  const { isOpen, isStake } = useMemo(
    () => ({
      isOpen: modal === StakeState.Stake || modal === StakeState.Unstake,
      isStake: modal === StakeState.Stake,
    }),
    [modal]
  );

  const Icon = getFarmsSVG(farm.id);

  const onSubmit = ({ value }: { value: string }) => {
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
          {isStake ? 'Stake' : 'Unstake'} {} token
        </Typography>
        <Box mt="XL">
          <InputStake
            setValue={setValue}
            register={register}
            amount={amount}
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
                  {farmSymbol}
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
              {farmSymbol} Token
            </Typography>
            <Typography variant="normal" my="L">
              {amount} {farmSymbol}
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
            display="flex"
            variant="primary"
            alignItems="center"
            justifyContent="center"
            bg={loading ? 'accentActive' : 'accent'}
            hover={{ bg: 'accentActive' }}
          >
            {loading && (
              <Box mr="M">
                <LoadingSVG width="1rem" />
              </Box>
            )}
            {loading ? 'Confirming...' : 'Confirm'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EarnStakeModal;
