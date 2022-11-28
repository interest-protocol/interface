import { FC } from 'react';

import { SVGProps } from '../svg/svg.types';

export interface SocialMediaCardProps {
  link: string;
  title: string;
  Logo: FC<SVGProps>;
}
