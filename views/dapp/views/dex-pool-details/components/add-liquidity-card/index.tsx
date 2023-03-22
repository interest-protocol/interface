import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';

import { AddLiquidityCardProps, INPUT_NAMES } from './add-liquidity-card.types';
import AddLiquidityCardContent from './add-liquidity-card-content';
import AddLiquidityManager from './add-liquidity-manager';
import InputBalance from './input-balance';

const AddLiquidityCard: FC<AddLiquidityCardProps> = ({
  tokens,
  isStable,
  fetchingInitialData,
  formAddLiquidity,
  chainId,
  account,
  refetch,
}) => {
  const t = useTranslations();
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);
  const [loading, setLoading] = useState(false);
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
          register={formAddLiquidity.register}
          setValue={formAddLiquidity.setValue}
          name={INPUT_NAMES[index]}
          balance={FixedPointMath.toNumber(balance, decimals)}
          disabled={loading || isFetchingQuote || allowance.isZero()}
          currencyPrefix={
            fetchingInitialData ? (
              <Box height="1rem" display="flex" borderRadius="2rem">
                <Skeleton height="1rem" width="1rem" borderRadius="2rem" />
                <Box width="2.5rem" ml="L">
                  <Skeleton />
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                width="4.5rem"
                maxHeight="1rem"
                alignItems="center"
                justifyContent="center"
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
        control={formAddLiquidity.control}
        setValue={formAddLiquidity.setValue}
        isFetchingQuote={isFetchingQuote}
        fetchingInitialData={fetchingInitialData}
        resetForm={formAddLiquidity.reset}
      />
      <AddLiquidityManager
        chainId={chainId}
        control={formAddLiquidity.control}
        setValue={formAddLiquidity.setValue}
        isFetchingQuote={isFetchingQuote || loading}
        setIsFetchingQuote={setIsFetchingQuote}
        tokens={tokens}
        isStable={isStable}
      />
    </Box>
  );
};

export default AddLiquidityCard;
