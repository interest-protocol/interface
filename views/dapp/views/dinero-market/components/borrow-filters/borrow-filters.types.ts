import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IDineroMarketForm } from '../../dinero-market.types';

interface FilterProps {
  control: Control<IDineroMarketForm>;
  setValue: UseFormSetValue<IDineroMarketForm>;
}

export enum BorrowSortByFilter {
  Default,
  TVL,
  LTV,
  InterestRate,
  Fee,
}

export type SortFilterProps = FilterProps;

export type OnlyBorrowingFilterProps = FilterProps;

export interface BorrowFiltersProps extends FilterProps {
  register: UseFormRegister<IDineroMarketForm>;
}
