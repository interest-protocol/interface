import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';

import InputBalance from './input-balance';
import { RemoveLiquidityCardProps } from './remove-liquidity-card.types';
import RemoveLiquidityCardContent from './remove-liquidity-card-content';
import RemoveLiquidityManager from './remove-liquidity-manager';

const RemoveLiquidityCard: FC<RemoveLiquidityCardProps> = ({
  chainId,
  tokens,
  isStable,
  lpAllowance,
  lpBalance,
  pairAddress,
  isFetchingInitialData,
  account,
  refetch,
  formRemoveLiquidity,
  lastDebouncedAmountState,
}) => {
  const t = useTranslations();

  return (
    <Box bg="foreground" p="L" borderRadius="M" width="100%">
      <Box mb="L">
        <Typography
          width="100%"
          fontSize="S"
          variant="normal"
          textTransform="uppercase"
        >
          {t('dexPoolPairAddress.removeLiquidity')}
        </Typography>
      </Box>
      <InputBalance
        name="lpAmount"
        control={formRemoveLiquidity.control}
        register={formRemoveLiquidity.register}
        setValue={formRemoveLiquidity.setValue}
        balance={FixedPointMath.toNumber(lpBalance)}
        disabled={lpAllowance.isZero() || lpBalance.isZero()}
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
      <RemoveLiquidityCardContent
        chainId={chainId}
        account={account}
        setValue={formRemoveLiquidity.setValue}
        isStable={isStable}
        control={formRemoveLiquidity.control}
        refetch={refetch}
        tokens={tokens}
        isFetchingInitialData={isFetchingInitialData}
        lpAllowance={lpAllowance}
        lpBalance={lpBalance}
        pairAddress={pairAddress}
      />
      <RemoveLiquidityManager
        chainId={chainId || 0}
        control={formRemoveLiquidity.control}
        setValue={formRemoveLiquidity.setValue}
        isStable={isStable}
        token0Address={tokens[0].address}
        token1Address={tokens[1].address}
        token0Decimals={tokens[0].decimals}
        token1Decimals={tokens[1].decimals}
        lastDebouncedAmountState={lastDebouncedAmountState}
      />
    </Box>
  );
};

export default RemoveLiquidityCard;
