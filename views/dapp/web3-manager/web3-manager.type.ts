import { FC, ReactNode, SVGAttributes } from 'react';

export interface AdvertisingProps {
  title: string;
  lines: ReadonlyArray<ReactNode>;
  Icon?: FC<SVGAttributes<SVGSVGElement>>;
}
