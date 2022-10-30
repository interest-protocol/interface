import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { ISyntheticMarketSummaryForm } from '../../synthetics-market.types';

interface FilterProps {
  control: Control<ISyntheticMarketSummaryForm>;
  setValue: UseFormSetValue<ISyntheticMarketSummaryForm>;
}

export enum SyntheticsSortByFilter {
  Default,
  TVL,
  LTV,
  Fee,
}

export type SortFilterProps = FilterProps;

export type OnlySynthesizedFilterProps = FilterProps;

export interface SyntheticMarketFiltersProps extends FilterProps {
  register: UseFormRegister<ISyntheticMarketSummaryForm>;
}
