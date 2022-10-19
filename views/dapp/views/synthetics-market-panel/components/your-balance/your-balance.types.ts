import { BigNumber } from 'ethers';

import { DineroCurrencyIcons } from '../../synthetics-market.types';

export interface YourBalanceProps {
  isPair: boolean;
  chainId: number;
  loading: boolean;
  dnrBalance: BigNumber;
  intBalance: BigNumber;
  collateralName: string;
  collateralDecimals: number;
  collateralBalance: BigNumber;
  currencyIcons: DineroCurrencyIcons;
}