import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { StakeState } from '@/constants';
import { Box, Button } from '@/elements';
import { capitalize } from '@/utils';

import { ButtonTabSelectProps } from './dinero-vault.types';

const ButtonTabSelect: FC<ButtonTabSelectProps> = ({ state, setState }) => {
  const isStake = state === StakeState.Stake;
  const t = useTranslations();
  return (
    <Box
      bg="transparent"
      display="flex"
      justifyContent="center"
      borderTopLeftRadius="M"
      borderTopRightRadius="M"
      height="3.25rem"
    >
      <Button
        variant="secondary"
        bg={isStake ? 'foreground' : 'transparent'}
        width="50%"
        borderRadius="0.5rem 0.5rem 0 0"
        height="100%"
        fontWeight={isStake ? '500' : '400'}
        fontSize="1rem"
        color={isStake ? 'text' : 'textSecondary'}
        onClick={() => setState(StakeState.Stake)}
      >
        {capitalize(t('common.stake', { isLoading: 0 }))}
      </Button>
      <Button
        variant="secondary"
        borderRadius="0.5rem 0.5rem 0 0"
        bg={!isStake ? 'foreground' : 'transparent'}
        width="50%"
        color={isStake ? 'text' : 'textSecondary'}
        fontWeight={isStake ? '500' : '400'}
        fontSize="1rem"
        onClick={() => setState(StakeState.Unstake)}
      >
        {capitalize(t('common.unstake', { isLoading: 0 }))}
      </Button>
    </Box>
  );
};

export default ButtonTabSelect;
