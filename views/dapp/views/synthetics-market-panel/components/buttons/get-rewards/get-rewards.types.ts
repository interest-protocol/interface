import { useGetRewards } from '../../../synthetics-market-panel.hooks';
import { SyntheticMarketData } from '../../../synthetics-market-panel.types';

export interface GetRewardsProps {
  market: SyntheticMarketData;
  refetch: () => Promise<void>;
}
