import { SyntheticMarketData } from '../../synthetics-market.types';

export interface GetRewardsProps {
  market: SyntheticMarketData;
  refetch: () => Promise<void>;
}
