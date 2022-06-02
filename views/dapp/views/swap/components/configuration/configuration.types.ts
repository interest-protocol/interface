import { ReactNode } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface FieldProps {
  label: string;
  step: string;
  name: string;
  placeholder: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
  register: UseFormRegister<FieldValues>;
}

export interface SwapModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
