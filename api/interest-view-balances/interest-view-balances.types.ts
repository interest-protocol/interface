import { BigNumber, CallOverrides } from 'ethers';

export type GetUserBalances = (
  chainId: number,
  user: string,
  tokens: Array<string>,
  overrides: CallOverrides
) => Promise<
  [BigNumber, BigNumber[]] & {
    nativeBalance: BigNumber;
    balances: BigNumber[];
  }
>;
