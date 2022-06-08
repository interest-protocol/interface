import { BigNumber } from 'ethers';
import { prop } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { getMailBorrowRate } from '@/api';
import { MAIL_BRIDGE_TOKENS_ARRAY } from '@/constants';
import { Typography } from '@/elements';
import { useDebounce } from '@/hooks';
import { BLOCKS_PER_YEAR, IntMath } from '@/sdk';
import { isSameAddress } from '@/utils';

import { BorrowRateImpactProps } from './borrow-rate-impact.types';

const BorrowRateImpact: FC<BorrowRateImpactProps> = ({
  type,
  data,
  control,
  chainId,
  pool,
}) => {
  const [newBorrowRate, setNewBorrowRate] = useState<BigNumber | null>(null);
  const value = useWatch({
    control,
    name: 'value',
  });

  const debouncedValue = useDebounce(value, 1500);

  useEffect(() => {
    (async () => {
      if (!data) return;

      const bridgeTokens = MAIL_BRIDGE_TOKENS_ARRAY[chainId].map(
        prop('address')
      );

      const bnValue = IntMath.toBigNumber(debouncedValue, data.decimals);

      if (bnValue.gt(data.cash)) return;

      try {
        const borrowRate = await getMailBorrowRate(
          chainId,
          pool,
          data.tokenAddress,
          bnValue.gt(data.cash) ? data.cash : bnValue,
          !bridgeTokens.some((elem) => isSameAddress(elem, data.tokenAddress))
        );

        setNewBorrowRate(borrowRate.mul(BLOCKS_PER_YEAR[chainId] || 0));
        //eslint-disable-next-line no-empty
      } catch {}
    })();
  }, [debouncedValue, chainId, data]);

  return (
    <Typography variant="normal">
      {type === 'borrow' ? (
        <>
          {`${(+(IntMath.toNumber(data.borrowRate) * 100).toFixed(
            2
          )).toPrecision(2)}% → 
                  ${(+(
                    newBorrowRate === null
                      ? IntMath.toNumber(data.borrowRate) * 100
                      : IntMath.toNumber(newBorrowRate) * 100
                  ).toFixed(2)).toPrecision(2)}%
                  `}
        </>
      ) : (
        `${(+(IntMath.toNumber(data.supplyRate) * 100).toFixed(2)).toPrecision(
          2
        )}%`
      )}
    </Typography>
  );
};

export default BorrowRateImpact;
