import { FC } from 'react';

import { RoutesEnum } from '../constants/routes';
import Home from '../views/home';
import OtherPage from '../views/other-page';

export const RouteComponent: Record<RoutesEnum, FC> = {
  [RoutesEnum.Home]: Home,
  [RoutesEnum.OtherPage]: OtherPage,
};
