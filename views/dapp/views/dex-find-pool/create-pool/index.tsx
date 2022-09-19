import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';

import { CreatePoolProps, DexFindPoolForm } from '../dex-find-pool.types';
import CreatePoolField from './create-pool-field';
import Price from './price';

const TOKEN_NAMES = ['tokenA', 'tokenB'] as ReadonlyArray<
  keyof Omit<DexFindPoolForm, 'isStable'>
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
    <Typography variant="normal" textTransform="uppercase">
      Create {getValues('isStable') ? 'Stable' : 'Volatile'} Pool
    </Typography>
    <Typography
      p="L"
      mt="L"
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
    <Box
      p="L"
      mt="L"
      display="grid"
      borderRadius="M"
      border="1px solid"
      alignItems="center"
      bg="bottomBackground"
      borderColor="textSoft"
      gridTemplateColumns="3rem auto"
    >
      <Box as="span" width="1.5rem" display="inline-block">
        <InfoSVG width="100%" />
      </Box>
      <Typography variant="normal" fontSize="0.85rem">
        {getValues('isStable') ? (
          <>
            Important: You are creating a market designed for correlated assets.
            Make sure that the tokens are pegged to the same asset, e.g.,
            BUSD/USDC.
          </>
        ) : (
          <>
            Important: You are creating a market designed for uncorrelated
            assets. E.g., BTC/ETH
          </>
        )}
      </Typography>
    </Box>
  </Box>
);

export default CreatePool;
