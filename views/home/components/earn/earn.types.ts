import { FC, SVGAttributes } from 'react';

export type TTokenIcons = ReadonlyArray<
  FC<SVGAttributes<SVGSVGElement> & { maxSize: string }>
>;

export interface LendAndBorrowTokensProps {
  icons: TTokenIcons;
}
