import { FC } from 'react';

import { Box, Button } from '@/elements';

import { StateProps } from '../vault/vault.types';

const ButtonTabSelect: FC<StateProps> = ({ state, setState }) => {
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
        bg={state === 'stake' ? 'foreground' : 'transparent'}
        width="50%"
        borderRadius="0.5rem 0.5rem 0 0"
        height="100%"
        fontWeight={state === 'stake' ? '500' : '400'}
        fontSize="1rem"
        color={state === 'stake' ? 'text' : 'textSecondary'}
        onClick={() => setState('stake')}
      >
        Stake
      </Button>
      <Button
        variant="secondary"
        borderRadius="0.5rem 0.5rem 0 0"
        bg={state === 'unstake' ? 'foreground' : 'transparent'}
        width="50%"
        color={state === 'unstake' ? 'text' : 'textSecondary'}
        fontWeight={state === 'unstake' ? '500' : '400'}
        fontSize="1rem"
        onClick={() => setState('unstake')}
      >
        Unstake
      </Button>
    </Box>
  );
};

export default ButtonTabSelect;
