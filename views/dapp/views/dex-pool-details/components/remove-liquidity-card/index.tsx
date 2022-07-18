import { FC, useState } from 'react';

import { removeLiquidity } from '@/api';
import {
  useChainId,
  useGetSigner,
  useGetUserBalanceAndAllowance,
  useQuoteRemoveLiquidity,
} from '@/hooks';
import { IntMath, ZERO_BIG_NUMBER } from '@/sdk';
import {
  formatMoney,
  getInterestDexRouterAddress,
  throwIfInvalidSigner,
} from '@/utils';

import {
  processBalanceAndAllowance,
  processQuoteRemoveLiquidityData,
} from '../../utils';
import { RemoveLiquidityCardProps } from './remove-liquidity-card.types';

const RemoveLiquidityCard: FC<RemoveLiquidityCardProps> = ({
  pairAddress,
  token1,
  token0,
  token1Metadata,
  token0Metadata,
  isStable,
}) => {
  // needs to be in a form
  const amountToWithdraw = '1234';

  const [loading, setLoading] = useState(false);

  const chainId = useChainId();
  const { account, signer } = useGetSigner();

  const { error: balanceError, data: balanceData } =
    useGetUserBalanceAndAllowance(
      getInterestDexRouterAddress(chainId),
      pairAddress
    );

  // Need a form to get on many LP tokens the user wants to withdraw.
  // Perhaps we do want to show a loader on the numbers. See what looks better
  const { error: quoteRemoveLiquidityError, data: quoteRemoveLiquidityData } =
    useQuoteRemoveLiquidity(token0, token1, isStable, ZERO_BIG_NUMBER);

  const processedBalancesData = processBalanceAndAllowance(balanceData);
  const processedQuoteRemoveLiquidityData = processQuoteRemoveLiquidityData(
    quoteRemoveLiquidityData
  );

  const handleRemoveLiquidity = async () => {
    if (
      processedBalancesData.allowance.isZero() ||
      processedQuoteRemoveLiquidityData.amountA.isZero() ||
      processedQuoteRemoveLiquidityData.amountB.isZero()
    )
      return;
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      // 3 minutes deadline
      const deadline = Math.floor(
        (new Date().getTime() + 3 * 60 * 1000) / 1000
      );

      // const tx = await removeLiquidity(
      //   validId,
      //   validSigner,
      //   token0,
      //   token1,
      //   isStable,
      //   ZERO_BIG_NUMBER
      // );
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (balanceError) return <div>error</div>;

  if (quoteRemoveLiquidityError) return <div>error2</div>;

  return (
    <div>
      <div>
        LP Balance:{' '}
        {formatMoney(IntMath.toNumber(processedBalancesData.balance))}
      </div>
      <div>
        {token0Metadata.symbol}{' '}
        {!processedQuoteRemoveLiquidityData.loading
          ? formatMoney(
              IntMath.toNumber(
                processedQuoteRemoveLiquidityData.amountA,
                token0Metadata.decimals.toNumber()
              )
            )
          : 'loading...'}
      </div>
      <div>
        {token0Metadata.symbol}{' '}
        {!processedQuoteRemoveLiquidityData.loading
          ? formatMoney(
              IntMath.toNumber(
                processedQuoteRemoveLiquidityData.amountB,
                token1Metadata.decimals.toNumber()
              )
            )
          : 'loading...'}
      </div>
      <div>
        {processedBalancesData.allowance.isZero() ? 'approve' : 'remove'}
      </div>
    </div>
  );
};

export default RemoveLiquidityCard;
