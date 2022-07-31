import { FC } from 'react';

import { Input } from '@/elements';

import { SwapSearchTokenProps } from '../../../dex.types';

const SwapSearchToken: FC<SwapSearchTokenProps> = ({
  register,
  isSearching,
}) => (
  <Input
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus
    disabled={isSearching}
    {...register('search')}
    placeholder="Type an address, name or symbol"
    shieldProps={{
      py: 'M',
      borderRadius: 'S',
      minWidth: ['20rem', '25rem'],
      bg: isSearching ? 'disabled' : 'background',
    }}
  />
);

export default SwapSearchToken;
