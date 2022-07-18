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

export type GetUserBalancesAndAllowances = (
  chainId: number,
  user: string,
  spender: string,
  tokens: Array<string>
) => Promise<
  [BigNumber[], BigNumber[]] & {
    allowances: BigNumber[];
    balances: BigNumber[];
  }
>;

export type GetUserBalanceAndAllowance = (
  chainId: number,
  user: string,
  spender: string,
  token: string
) => Promise<
  [BigNumber, BigNumber] & { allowance: BigNumber; balance: BigNumber }
>;
