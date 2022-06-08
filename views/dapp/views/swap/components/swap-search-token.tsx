import { FC } from 'react';

import { Input } from '@/elements';

import { SwapSearchTokenProps } from '../swap.types';

const SwapSearchToken: FC<SwapSearchTokenProps> = ({ register }) => (
  <Input
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus
    {...register('search')}
    placeholder="Type the address"
    shieldProps={{
      py: 'M',
      width: '25rem',
      bg: 'background',
      borderRadius: 'S',
    }}
  />
);

export default SwapSearchToken;
