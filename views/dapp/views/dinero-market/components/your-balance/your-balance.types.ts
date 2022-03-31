import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { ERC20 } from '@/sdk/entities/erc-20';

export interface YourBalanceProps {
  loading: boolean;
  balances: ReadonlyArray<CurrencyAmount<ERC20>>;
}
