import { BigNumber } from 'ethers';

import { ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { IUserBalance } from '@/state/user-balances/user-balances.types';
import { isSameAddress } from '@/utils';

export const handleTokenBalance = (
  x: IUserBalance | undefined,
  nativeBalance: string
) => {
  if (!x) return ZERO_BIG_NUMBER;

  if (isSameAddress(x.id, ZERO_ADDRESS)) return BigNumber.from(nativeBalance);

  return BigNumber.from(x.balance);
};
