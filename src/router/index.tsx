import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 } from 'uuid';

import { Routes, RoutesEnum, routesList } from '../constants/routes';
import { RouteComponent } from './routes';

const renderRoutes = routesList.map((route: RoutesEnum) =>
  RouteComponent[route] ? (
    <Route path={Routes[route]} key={v4()}>
      {RouteComponent[route]}
    </Route>
  ) : null
);

const Router: FC = () => <Switch>{renderRoutes}</Switch>;

export default Router;
