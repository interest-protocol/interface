import { formatMoney } from '@/utils';

import { TTableDataMock } from './earn-table.types';

export const getEarnMockData: TTableDataMock = (contract) =>
  contract === 'stake'
    ? {
        error: null,
        data: [{ tvl: 20_000, apy: 10.5, apr: 5, earned: formatMoney(0) }],
      }
    : {
        error: null,
        data: [{ tvl: 25_333_123, apy: 5, apr: 5, earnedFee: '5%' }],
      };
