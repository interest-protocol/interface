import // useGetSigner,
'@/hooks';

import {
  FC,
  // useState
} from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { TimesSVG } from '@/svg';
import { WalletGuardButton } from '@/views/dapp/components';

import InputBalance from './input-balance';
import {
  AddLiquidityCardProps,
  IAddLiquidityForm,
} from './liquidity-form.types';

const AddLiquidityCard: FC<AddLiquidityCardProps> = ({
  tokens,
  balances,
  // isStable,
  // addresses,
  // lpBalance,
}) => {
  // const [, setLoading] = useState(false);

  const { register, setValue } = useForm<IAddLiquidityForm>({
    defaultValues: {
      tokenInAmount: '0.0',
      tokenOutAmount: '0.0',
    },
  });
  // const { account, signer } = useGetSigner();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleAddLiquidity = async () => {};

  const error = false;

  if (error)
    return (
      <Box
        px="L"
        py="XL"
        width="100%"
        display="flex"
        bg="foreground"
        borderRadius="M"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box color="error">
          <TimesSVG width="5rem" />
        </Box>
        <Typography variant="normal">ERROR! Fail to add liquidity!</Typography>
      </Box>
    );

  return (
    <Box bg="foreground" p="L" borderRadius="M" width="100%">
      <Box mb="L">
        <Typography
          width="100%"
          fontSize="S"
          variant="normal"
          textTransform="uppercase"
        >
          Add Liquidity
        </Typography>
      </Box>
      <InputBalance
        max={balances[1]}
        register={register}
        setValue={setValue}
        name="tokenInAmount"
        currencyPrefix={
          <Box display="flex" width="5rem">
            {tokens[0].Icon}
            <Typography variant="normal" ml="M">
              {tokens[0].symbol}
            </Typography>
          </Box>
        }
      />
      <InputBalance
        max={balances[1]}
        register={register}
        setValue={setValue}
        name="tokenOutAmount"
        currencyPrefix={
          <Box display="flex" width="5rem">
            {tokens[1].Icon}
            <Typography variant="normal" ml="M">
              {tokens[1].symbol}
            </Typography>
          </Box>
        }
      />
      <WalletGuardButton>
        <Box display="grid" gridColumnGap="1rem" gridTemplateColumns="1fr 1fr">
          <Button
            width="100%"
            variant="primary"
            bg="bottomBackground"
            hover={{ bg: 'disabled' }}
          >
            Reset
          </Button>
          <Button
            bg="accent"
            width="100%"
            variant="primary"
            onClick={handleAddLiquidity}
            hover={{ bg: 'accentActive' }}
          >
            Add
          </Button>
        </Box>
      </WalletGuardButton>
    </Box>
  );
};

export default AddLiquidityCard;
