import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { WalletGuardButton } from '@/views/dapp/components';

import { ClaimFormProps, IClaimForm } from './claim-form.types';
import InputBalance from './input-balance';

const ClaimForm: FC<ClaimFormProps> = ({ Icons, symbols, balances }) => {
  const { register, setValue } = useForm<IClaimForm>({
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
          Claim Fees
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
      <WalletGuardButton>
        <Button variant="primary" width="100%" hover={{ bg: 'accentActive' }}>
          Claim
        </Button>
      </WalletGuardButton>
    </Box>
  );
};

export default ClaimForm;
