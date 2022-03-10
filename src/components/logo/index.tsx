import React, { FC } from 'react';

import { LogoSVG } from '../svg';
import { LogoWrapper } from './logo.styles';

const Logo: FC = () => (
  <LogoWrapper>
    <LogoSVG />
  </LogoWrapper>
);

export default Logo;
