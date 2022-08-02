import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import { CreatePoolProps, DexFindPoolForm } from '../dex-find-pool.types';
import CreatePoolField from './create-pool-field';
import Price from './price';

const TOKEN_NAMES = ['tokenA', 'tokenB'] as ReadonlyArray<
  Exclude<keyof DexFindPoolForm, 'isStable'>
>;

const CreatePool: FC<CreatePoolProps> = ({
  control,
  register,
  needAllowance,
  setValue,
  update,
  tokenBalances,
  getValues,
}) => (
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
    <Price control={control} />
    {TOKEN_NAMES.map((name, index) => (
      <CreatePoolField
        getValues={getValues}
        update={update}
        setValue={setValue}
        key={v4()}
        name={name}
        register={register}
        needAllowance={needAllowance[index]}
        tokenBalance={tokenBalances[index]}
      />
    ))}
  </Box>
);

export default CreatePool;
