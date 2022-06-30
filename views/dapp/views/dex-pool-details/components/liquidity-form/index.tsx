import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';

import InputBalance from './input-balance';
import { ILiquidityForm, LiquidityFormProps } from './liquidity-form.types';

const LiquidityForm: FC<LiquidityFormProps> = ({
  Icons,
  symbols,
  balances,
}) => {
  const { register, setValue } = useForm<ILiquidityForm>({
    defaultValues: { pairMember1Amount: '0', pairMember2Amount: '0' },
  });

  return (
    <Box bg="foreground" p="L" borderRadius="M" width="100%">
      <Box mb="L">
        <Typography
          width="100%"
          fontSize="S"
          variant="normal"
          textTransform="uppercase"
        >
          Add/remove Liquidity
        </Typography>
      </Box>
      <InputBalance
        max={balances[0]}
        register={register}
        setValue={setValue}
        name="pairMember1Amount"
        currencyPrefix={
          <Box display="flex">
            {Icons[0]}
            <Typography variant="normal" ml="M">
              {symbols[0]}
            </Typography>
          </Box>
        }
      />
      <Box
        mx="auto"
        mt="-1rem"
        mb="-0.6rem"
        width="2.3rem"
        height="2.3rem"
        display="flex"
        bg="background"
        color="disabled"
        border="1px solid"
        borderRadius="50%"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        +
      </Box>
      <InputBalance
        max={balances[1]}
        register={register}
        setValue={setValue}
        name="pairMember2Amount"
        currencyPrefix={
          <Box display="flex">
            {Icons[1]}
            <Typography variant="normal" ml="M">
              {symbols[1]}
            </Typography>
          </Box>
        }
      />
      <Box display="grid" gridColumnGap="1rem" gridTemplateColumns="1fr 1fr">
        <Button variant="primary" bg="error" width="100%">
          Remove
        </Button>
        <Button variant="primary" width="100%">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default LiquidityForm;
