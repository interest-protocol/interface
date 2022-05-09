import { createEntityAdapter } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { prop } from 'ramda';

import { IUserBalance } from './user-balances.types';

export const userBalancesAdapter = createEntityAdapter<IUserBalance>({
  selectId: prop('id'),
  sortComparer: (a, b) => {
    const aBalance = BigNumber.from(a.balance);
    const bBalance = BigNumber.from(b.balance);

    if (aBalance.eq(bBalance)) return 0;

    return aBalance.gt(bBalance) ? 1 : -1;
  },
});
