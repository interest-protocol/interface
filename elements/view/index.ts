import styled from '@emotion/styled';
import { FC } from 'react';
import {
  background,
  border,
  color,
  compose,
  layout,
  space,
  typography,
} from 'styled-system';

import { ViewProps } from './view.types';

const View: FC<ViewProps> = styled.div(
  compose(color, space, border, layout, typography, background)
);

export default View;
