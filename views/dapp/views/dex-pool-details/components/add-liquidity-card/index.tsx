import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { FixedPointMath } from '@/sdk';

import {
  AddLiquidityCardProps,
  IAddLiquidityForm,
  INPUT_NAMES,
} from './add-liquidity-card.types';
import AddLiquidityCardContent from './add-liquidity-card-content';
import AddLiquidityManager from './add-liquidity-manager';
import InputBalance from './input-balance';

const AddLiquidityCard: FC<AddLiquidityCardProps> = ({
  tokens,
  isStable,
  fetchingInitialData,
  refetch,
}) => {
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);
  const [loading, setLoading] = useState(false);

  const { account, chainId } = useIdAccount();
  const t = useTranslations();

  const { register, setValue, control } = useForm<IAddLiquidityForm>({
    defaultValues: {
      token0Amount: '0.0',
      token1Amount: '0.0',
      error: '',
      locked: false,
    },
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
          {t('dexPoolPairAddress.addLiquidity')}
        </Typography>
      </Box>
      {tokens.map(({ balance, decimals, allowance, Icon, symbol }, index) => (
        <InputBalance
          key={v4()}
          register={register}
          setValue={setValue}
          name={INPUT_NAMES[index]}
          balance={FixedPointMath.toNumber(balance, decimals)}
          disabled={loading || isFetchingQuote || allowance.isZero()}
          currencyPrefix={
            fetchingInitialData ? (
              <>
                <Box width="1rem" height="1rem" borderRadius="2rem">
                  <Skeleton height="100%" borderRadius="2rem" />
                </Box>
                <Box width="2.5rem" ml="L">
                  <Skeleton />
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                width="4.5rem"
                maxHeight="1rem"
                alignItems="center"
              >
                {Icon}
                <Typography variant="normal" ml="M" maxHeight="1rem">
                  {symbol}
                </Typography>
              </Box>
            )
          }
        />
      ))}
      <AddLiquidityCardContent
        chainId={chainId}
        account={account}
        loading={loading}
        setLoading={setLoading}
        tokens={tokens}
        isStable={isStable}
        refetch={refetch}
        control={control}
        setValue={setValue}
        isFetchingQuote={isFetchingQuote}
        fetchingInitialData={fetchingInitialData}
      />
      <AddLiquidityManager
        chainId={chainId}
        control={control}
        setValue={setValue}
        isFetchingQuote={isFetchingQuote || loading}
        setIsFetchingQuote={setIsFetchingQuote}
        tokens={tokens}
        isStable={isStable}
      />
    </Box>
  );
};

export default AddLiquidityCard;
