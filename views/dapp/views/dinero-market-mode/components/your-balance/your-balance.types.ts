import { SafeDineroMarketUserData } from '@/utils/dinero-market/dinero-market.types';

export interface YourBalanceProps {
  loading: boolean;
  dineroPair: SafeDineroMarketUserData['dineroPair'];
}
