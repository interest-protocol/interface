import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

export interface SwapTokenModalMetadata {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId?: number;
}

export interface SwapHeaderProps {
  description: string;
}

export interface SwapModalProps {
  isOpen: boolean;
  handleClose: () => void;
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
  disabled?: boolean;
  fromRight?: boolean;
  currentToken: string;
  onSelectCurrency: (currency: string) => void;
}

export interface SwapProps {
  customAction: () => void;
}

export interface SwapCurrencyDropdownProps {
  Input: ReactNode;
  disabled?: boolean;
  fromRight?: boolean;
  isSearching: boolean;
  isOpenModal: boolean;
  currentToken: string;
  toggleModal: () => void;
  control: Control<{ search: string }>;
  onSelectCurrency: (currency: string) => void;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

export interface SwapSearchTokenProps {
  isSearching: boolean;
  register: UseFormRegister<{ search: string }>;
}
