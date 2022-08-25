import { BigNumber } from 'ethers';

import { DineroCurrencyIcons } from '../../dinero-market.types';

export interface YourBalanceProps {
  loading: boolean;
  dnrBalance: BigNumber;
  collateralName: string;
  collateralDecimals: number;
  collateralBalance: BigNumber;
  currencyIcons: DineroCurrencyIcons;
}
