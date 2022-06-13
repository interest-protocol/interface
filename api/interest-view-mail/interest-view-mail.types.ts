import { BigNumber } from 'ethers';

export type GetManyMAILSummaryData = (
  chainId: number,
  tokens: Array<string>,
  riskyTokens: Array<string>
) => Promise<
  [BigNumber[][], BigNumber[][]] & {
    borrowRates: BigNumber[][];
    supplyRates: BigNumber[][];
  }
>;
