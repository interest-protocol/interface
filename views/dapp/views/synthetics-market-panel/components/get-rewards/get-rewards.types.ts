import { SyntheticMarketData } from '../../synthetics-market-panel.types';
import { useGetRewards } from './../../synthetics-market-panel.hooks';

export interface GetRewardsProps {
  market: SyntheticMarketData;
  refetch: () => Promise<void>;
  getRewards: ReturnType<typeof useGetRewards>['writeAsync'];
}
