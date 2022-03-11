import { ReactNode } from 'react';

export interface IRoadMapItem {
  next: string;
  title: string;
  status: number;
  list: ReadonlyArray<ReactNode>;
}
export interface RoadMapItemProps extends IRoadMapItem {
  step: number;
  length: number;
  position: number;
  onNext: () => void;
  onBack: () => void;
}
