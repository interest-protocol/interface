import { FC } from 'react';

import { Input } from '@/elements';

import { FaucetSearchTokenProps } from '../faucet.types';

const FaucetSearchToken: FC<FaucetSearchTokenProps> = ({ register }) => (
  <Input
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus
    type="string"
    {...register('search')}
    placeholder="Type the address"
    shieldProps={{
      py: 'M',
      width: '100%',
      bg: 'background',
      borderRadius: 'S',
      minWidth: ['15rem', '15rem', '15rem', '25rem'],
    }}
  />
);

export default FaucetSearchToken;
