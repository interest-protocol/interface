import { BigNumber } from 'ethers';

import { DineroCurrencyIcons } from '../../dinero-market.types';

export interface YourBalanceProps {
  isPair: boolean;
  loading: boolean;
  dnrBalance: BigNumber;
  intBalance: BigNumber;
  collateralName: string;
  collateralDecimals: number;
  collateralBalance: BigNumber;
  currencyIcons: DineroCurrencyIcons;
}
