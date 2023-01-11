import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

import { OnSelectCurrencyData } from './swap/swap.types';

export interface SwapTokenModalMetadata {
  name: string;
  symbol: string;
  type: string;
  decimals: number;
}

export interface SwapFormTokenData {
  value: string;
  type: string;
  decimals: number;
  symbol: string;
}

export interface SwapSelectCurrencyProps {
  label?: string;
  symbol: string;
  type: string;
  disabled?: boolean;
  fromRight?: boolean;
  currentToken: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onSelectCurrency: (data: OnSelectCurrencyData) => void;
}

export interface SwapCurrencyDropdownProps {
  Input: ReactNode;
  fromRight?: boolean;
  isSearching: boolean;
  isModalOpen: boolean;
  currentToken: SwapSelectCurrencyProps['currentToken'];
  toggleModal: () => void;
  control: Control<{ search: string }>;
  onSelectCurrency: SwapSelectCurrencyProps['onSelectCurrency'];
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

export interface SwapSearchTokenProps {
  isSearching: boolean;
  register: UseFormRegister<{ search: string }>;
}
