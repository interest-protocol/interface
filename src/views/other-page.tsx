import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Routes, RoutesEnum } from '../constants/routes';
import { View } from '../elements';

const OtherPage: FC = () => (
  <View>
    <h1>Other Page</h1>
    <Link to={Routes[RoutesEnum.Home]}> &larr; Back to home </Link>
  </View>
);

export default OtherPage;
