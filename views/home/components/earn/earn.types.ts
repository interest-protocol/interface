import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export type TTokenIcons = ReadonlyArray<FC<SVGProps>>;

export interface LendAndBorrowTokensProps {
  icons: TTokenIcons;
}
