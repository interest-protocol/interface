import { BigNumber } from 'ethers';

import { LocalMAILMarketData, MailMarketsSummaryData } from '@/interface';

export type ProcessManyMailSummaryData = (
  data:
    | ([BigNumber[][], BigNumber[][]] & {
        borrowRates: BigNumber[][];
        supplyRates: BigNumber[][];
      })
    | undefined,
  localMailData: ReadonlyArray<LocalMAILMarketData>,
  chainId: number | null
) => {
  recommendedMarkets: ReadonlyArray<MailMarketsSummaryData>;
  localMarkets: ReadonlyArray<MailMarketsSummaryData>;
};
