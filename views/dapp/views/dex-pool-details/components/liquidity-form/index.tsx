import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { WalletGuardButton } from '@/views/dapp/components';

import InputBalance from './input-balance';
import { ILiquidityForm, LiquidityFormProps } from './liquidity-form.types';

const LiquidityForm: FC<LiquidityFormProps> = ({ Icons, balances }) => {
  const { register, setValue } = useForm<ILiquidityForm>({
    defaultValues: { pairMember1Amount: '0', pairMember2Amount: '0' },
  });

  const ratio = Math.random();

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
        ratio={ratio}
        max={balances[0]}
        register={register}
        setValue={setValue}
        name="pairMember1Amount"
        changeTarget="pairMember2Amount"
        currencyPrefix={
          <Box display="flex">
            <Typography
              bg="accentAlternative"
              width="1rem"
              height="1rem"
              fontSize="S"
              variant="normal"
              textAlign="center"
              borderRadius="50%"
            >
              $
            </Typography>
            <Typography variant="normal" ml="M">
              USD
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
        ratio={1 / ratio}
        max={balances[1]}
        register={register}
        setValue={setValue}
        name="pairMember2Amount"
        changeTarget="pairMember1Amount"
        currencyPrefix={
          <Box display="flex">
            {Icons[0]}
            {Icons[1]}
            <Typography variant="normal" ml="M">
              LP
            </Typography>
          </Box>
        }
      />
      <WalletGuardButton>
        <Box display="grid" gridColumnGap="1rem" gridTemplateColumns="1fr 1fr">
          <Button
            bg="error"
            width="100%"
            variant="primary"
            hover={{ bg: 'errorActive' }}
          >
            Remove
          </Button>
          <Button width="100%" variant="primary" hover={{ bg: 'accentActive' }}>
            Add
          </Button>
        </Box>
      </WalletGuardButton>
    </Box>
  );
};

export default LiquidityForm;
