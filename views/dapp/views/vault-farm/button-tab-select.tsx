import { FC, useState } from 'react';

import { Box, Button } from '@/elements';

const ButtonTabSelect: FC = () => {
  const [select, setSelect] = useState('stake');
  return (
    <Box>
      <Button
        variant="primary"
        width="50%"
        borderBottomLeftRadius="unset"
        borderBottomRightRadius="unset"
        bg={select == 'stake' ? 'foreground' : 'transparent'}
        fontSize="1rem"
        fontWeight={select == 'stake' ? '500' : '400'}
        color={select == 'stake' ? 'text' : 'textSecondary'}
        onClick={() => setSelect('stake')}
      >
        Stake
      </Button>
      <Button
        variant="primary"
        width="50%"
        borderBottomLeftRadius="unset"
        borderBottomRightRadius="unset"
        bg={select != 'stake' ? 'foreground' : 'transparent'}
        fontSize="1rem"
        fontWeight={select != 'stake' ? '500' : '400'}
        color={select != 'stake' ? 'text' : 'textSecondary'}
        onClick={() => setSelect('unstake')}
      >
        Unstake
      </Button>
    </Box>
  );
};

export default ButtonTabSelect;
