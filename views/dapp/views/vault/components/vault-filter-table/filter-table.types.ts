import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { StateProps } from '../../vault.types';

export interface IButtonOption {
  options: ReadonlyArray<string>;
  whoIsSelected: string;
  setWhoIsSelected: Dispatch<SetStateAction<string>>;
}

export interface InputSearchProps {
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
}

export interface FilterTableProps extends StateProps, InputSearchProps {}
