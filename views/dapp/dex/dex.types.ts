import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

import { OnSelectCurrencyData } from '@/views/dapp/views/dex/swap/swap.types';

export interface SwapTokenModalMetadata {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId?: number;
}

export interface SwapFormTokenData {
  value: string;
  address: string;
  decimals: number;
  symbol: string;
  setByUser: boolean;
}

export interface SwapSelectCurrencyProps {
  label?: string;
  symbol: string;
  address: string;
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
  chainId: number;
}

export interface SwapSearchTokenProps {
  isSearching: boolean;
  register: UseFormRegister<{ search: string }>;
}
