import { FC, ReactNode, SVGAttributes } from 'react';

export interface OpportunitiesCardProps {
  title: ReactNode;
  description: ReactNode;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}
