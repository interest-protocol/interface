import { FC, SVGProps } from 'react';

export interface SocialMediaCardProps {
  link: string;
  title: string;
  Logo: FC<SVGProps<SVGSVGElement>>;
}
