import { Dispatch, FC, SetStateAction, SVGAttributes } from 'react';

export interface VaultTableProps {
  data: ReadonlyArray<VaultData>;
  loading: boolean;
}

export interface VaultCardItemProps {
  title: string;
  content: string;
}

export interface VaultNameProps {
  Icons: ReadonlyArray<FC<SVGAttributes<SVGSVGElement>>>;
  isAuto?: boolean;
  caption: string;
  name: string;
}

export interface VaultRow {
  name: VaultNameProps;
  apy: string;
  earn: string;
  type: string;
  tvl: string;
}

export interface VaultData {
  items: {
    id: string;
    vaultName: (string | boolean | FC<SVGAttributes<SVGSVGElement>>[])[];
    apy: string;
    earn: string;
    type: string;
    tvl: string;
  };
}

export interface StateProps {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}
