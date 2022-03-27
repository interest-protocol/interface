import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { NativeCurrency } from '@/sdk/entities/native-currency';

export type UseGetUSerCurrency = () => {
  symbol: string;
  amount: CurrencyAmount<NativeCurrency>;
};
