import { FC, SVGAttributes } from 'react';

export type TTokenIcons = ReadonlyArray<FC<SVGAttributes<SVGSVGElement>>>;

export interface LendAndBorrowTokensProps {
  icons: TTokenIcons;
}
