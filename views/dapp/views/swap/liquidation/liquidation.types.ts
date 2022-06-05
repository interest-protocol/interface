import { Dispatch, SetStateAction } from 'react';

export interface PairsProps {
  perceptual: string;
  type: string;
  perceptualSelect: string;
  isSelect: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}
