import { BigNumber } from 'ethers';
import { Control } from 'react-hook-form';

import { IEarnForm, SafeFarmSummaryData } from '../../earn.types';

export interface EarnTableProps {
  loading: boolean;
  isDesktop: boolean;
  farms: SafeFarmSummaryData['farms'];
  intUSDPrice: BigNumber;
  control: Control<IEarnForm>;
}
