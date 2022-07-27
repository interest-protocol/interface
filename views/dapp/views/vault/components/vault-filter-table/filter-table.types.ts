import { Dispatch, SetStateAction } from 'react';

export interface IButtonOption {
  options: ReadonlyArray<string>;
  whoIsSelected: string;
  setWhoIsSelected: Dispatch<SetStateAction<string>>;
}
