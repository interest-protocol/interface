import { FC } from 'react';

import { Input } from '@/elements';

import { SwapSearchTokenProps } from '../../../dex.types';

const SwapSearchToken: FC<SwapSearchTokenProps> = ({ register }) => (
  <Input
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus
    {...register('search')}
    placeholder="Type an address, name or symbol"
    shieldProps={{
      py: 'M',
      width: '25rem',
      bg: 'background',
      borderRadius: 'S',
    }}
  />
);

export default SwapSearchToken;
