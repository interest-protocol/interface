import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { getFarmsSVGByToken, StakeState } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { useLocale } from '@/hooks';
import { LoadingSVG, TimesSVG } from '@/svg';
import { capitalize, formatMoney, safeToBigNumber } from '@/utils';

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
  const t = useTranslations();
  const { currentLocale } = useLocale();
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

  const Icons = getFarmsSVGByToken(farm.chainId, farm.token0, farm.token1);

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
              <Box as="span" display="inline-block" width="1rem">
                <TimesSVG width="100%" />
              </Box>
            </Button>
          </Box>
        </Box>
        <Typography
          variant="normal"
          textAlign="center"
          fontSize="L"
          textTransform="capitalize"
        >
          {t(
            isStake
              ? 'earnTokenAddress.modalStakedTitle'
              : 'earnTokenAddress.modalUnstakedTitle'
          )}{' '}
          token
        </Typography>
        <Box mt="XL">
          <InputStake
            setValue={setValue}
            register={register}
            amount={amount}
            currencyPrefix={
              <Box display="flex" alignItems="center">
                <Box display="inline-flex">
                  {Icons.map(({ SVG, highZIndex }, index) => (
                    <Box
                      key={v4()}
                      width="1.6rem"
                      ml={index != 0 ? '-0.5rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" />
                    </Box>
                  ))}
                </Box>
                <Typography variant="normal" ml="M">
                  {farmSymbol}
                </Typography>
              </Box>
            }
            label={t('earnTokenAddress.modalLabelInput', {
              currentLocale,
              type: t(isStake ? 'common.stake' : 'common.unstake', {
                isLoading: 0,
              }),
            })}
          />
        </Box>
        <Box mt="XL">
          <Typography variant="normal" textTransform="uppercase">
            {t(
              isStake
                ? 'common.yourBalance'
                : 'earnTokenAddress.yourStakedLabel'
            )}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="normal" my="L">
              {farmSymbol} Token
            </Typography>
            <Typography variant="normal" my="L">
              {formatMoney(amount)} {farmSymbol}
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
            {capitalize(t('common.cancel'))}
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
              <Box mr="M" width="1rem">
                <LoadingSVG width="100%" />
              </Box>
            )}
            {capitalize(t('common.confirm', { isLoading: Number(loading) }))}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EarnStakeModal;
