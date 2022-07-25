import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import {
  // useGetSigner,
  useQuoteRemoveLiquidity,
} from '@/hooks';
import { IntMath, ZERO_BIG_NUMBER } from '@/sdk';
import { TimesSVG } from '@/svg';
import { WalletGuardButton } from '@/views/dapp/components';

import { processQuoteRemoveLiquidityData } from '../../utils';
import InputBalance from './input-balance';
import {
  IRemoveLiquidityForm,
  RemoveLiquidityCardProps,
} from './remove-liquidity-card.types';

const RemoveLiquidityCard: FC<RemoveLiquidityCardProps> = ({
  tokens,
  isStable,
  addresses,
  lpBalance,
}) => {
  const [, setLoading] = useState(false);
  const [tokenInAmount] = useState('0.0');
  const [tokenOutAmount] = useState('0.0');

  const { register, setValue } = useForm<IRemoveLiquidityForm>({
    defaultValues: {
      lpAmount: '0.0',
    },
  });
  // const { account, signer } = useGetSigner();

  // Need a form to get on many LP tokens the user wants to withdraw.
  // Perhaps we do want to show a loader on the numbers. See what looks better
  const { error: quoteRemoveLiquidityError, data: quoteRemoveLiquidityData } =
    useQuoteRemoveLiquidity(
      addresses[0],
      addresses[1],
      isStable,
      ZERO_BIG_NUMBER
    );

  const processedQuoteRemoveLiquidityData = processQuoteRemoveLiquidityData(
    quoteRemoveLiquidityData
  );
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleRemoveLiquidity = async () => {
    if (
      lpBalance.allowance.isZero() ||
      processedQuoteRemoveLiquidityData.amountA.isZero() ||
      processedQuoteRemoveLiquidityData.amountB.isZero()
    )
      return;
    try {
      setLoading(true);

      // const ok = throwIfInvalidSigner([account], chainId, signer);

      // 3 minutes deadline
      // const deadline = Math.floor(
      //   (new Date().getTime() + 3 * 60 * 1000) / 1000
      // );

      // const tx = await removeLiquidity(
      //   validId,
      //   validSigner,
      //   token0,
      //   token1,
      //   isStable,
      //   ZERO_BIG_NUMBER
      // );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // if (quoteRemoveLiquidityError)
  //   return (
  //     <Box
  //       px="L"
  //       py="XL"
  //       width="100%"
  //       display="flex"
  //       bg="foreground"
  //       borderRadius="M"
  //       alignItems="center"
  //       flexDirection="column"
  //       justifyContent="center"
  //     >
  //       <Box color="error">
  //         <TimesSVG width="5rem" />
  //       </Box>
  //       <Typography variant="normal">
  //         ERROR! Fail to remove liquidity!
  //       </Typography>
  //     </Box>
  //   );

  return (
    <Box bg="foreground" p="L" borderRadius="M" width="100%">
      <Box mb="L">
        <Typography
          width="100%"
          fontSize="S"
          variant="normal"
          textTransform="uppercase"
        >
          Remove Liquidity
        </Typography>
      </Box>
      <InputBalance
        name="lpAmount"
        max={IntMath.toNumber(lpBalance.balance)}
        register={register}
        setValue={setValue}
        currencyPrefix={
          <Box display="flex" width="5rem">
            {tokens[0].Icon}
            {tokens[1].Icon}
            <Typography variant="normal" ml="M">
              LP
            </Typography>
          </Box>
        }
      />
      <Box display="flex" my="L">
        {tokens[0].Icon}
        <Typography variant="normal" ml="M">
          {tokens[0].symbol}: {tokenInAmount}
        </Typography>
      </Box>
      <Box display="flex" my="L">
        {tokens[1].Icon}
        <Typography variant="normal" ml="M">
          {tokens[1].symbol}: {tokenOutAmount}
        </Typography>
      </Box>
      <WalletGuardButton>
        <Box
          mt="L"
          display="grid"
          gridColumnGap="1rem"
          gridTemplateColumns="1fr 1fr"
        >
          <Button
            width="100%"
            variant="primary"
            bg="bottomBackground"
            hover={{ bg: 'disabled' }}
          >
            Reset
          </Button>
          <Button
            bg="error"
            width="100%"
            variant="primary"
            hover={{ bg: 'errorActive' }}
            onClick={handleRemoveLiquidity}
          >
            Remove
          </Button>
        </Box>
      </WalletGuardButton>
    </Box>
  );
};

export default RemoveLiquidityCard;
