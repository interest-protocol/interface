import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { Input } from '@/elements';

const FaucetSearchToken: FC<{ register: UseFormRegister<{ search: string }> }> =
  ({ register }) => (
    <Input
      {...register('search')}
      placeholder="type the address"
      shieldProps={{
        py: 'M',
        bg: 'background',
        borderRadius: 'S',
      }}
    />
  );

export default FaucetSearchToken;
