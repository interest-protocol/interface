import { FC } from 'react';

import { Button } from '@/elements';

import { InputMaxButtonProps } from './input-money.types';

const InputMaxButton: FC<InputMaxButtonProps> = ({ max, name, setValue }) => {
  return (
    <Button
      px="M"
      fontSize="S"
      type="button"
      height="100%"
      variant="secondary"
      bg="bottomBackground"
      hover={{ bg: 'accent' }}
      active={{ bg: 'accentActive' }}
      onClick={() => setValue?.(name, +(max ?? 0))}
    >
      max
    </Button>
  );
};
export default InputMaxButton;
