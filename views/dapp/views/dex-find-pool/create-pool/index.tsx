import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { formatMoney } from '@/utils';

import { CreatePoolProps, DexFindPoolForm } from '../dex-find-pool.types';
import CreatePoolField from './create-pool-field';

const TOKEN_NAMES = ['tokenA', 'tokenB'] as ReadonlyArray<
  Exclude<keyof DexFindPoolForm, 'isStable'>
>;

const isInfinity = (number: number) =>
  number === Infinity || number === -Infinity;

const CreatePool: FC<CreatePoolProps> = ({
  control,
  register,
  needAllowance,
}) => {
  const { value: valueA, symbol: symbolA } = useWatch({
    control,
    name: 'tokenA',
  });

  const { value: valueB, symbol: symbolB } = useWatch({
    control,
    name: 'tokenB',
  });

  return (
    <Box
      p="L"
      my="L"
      color="text"
      width="100%"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
    >
      <Typography
        p="L"
        variant="normal"
        borderRadius="M"
        border="1px solid"
        bg="bottomBackground"
        borderColor="textSoft"
      >
        This pool does not exist! Please, create one now.
      </Typography>
      <Typography variant="normal" my="L" textAlign="center">
        {isNaN(+valueA / +valueB) || isInfinity(+valueA / +valueB) ? '0' : '1'}{' '}
        {symbolA} ={' '}
        {isNaN(+valueA / +valueB) || isInfinity(+valueA / +valueB)
          ? '0'
          : formatMoney(+valueA / +valueB, 2)}{' '}
        {symbolB}
      </Typography>
      {TOKEN_NAMES.map((name, index) => (
        <CreatePoolField
          key={v4()}
          name={name}
          control={control}
          register={register}
          needAllowance={needAllowance[index]}
        />
      ))}
    </Box>
  );
};

export default CreatePool;
