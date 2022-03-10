import styled from '@emotion/styled';
import React, { FC } from 'react';
import {
  border,
  boxShadow,
  color,
  compose,
  layout,
  position,
  space,
  system,
  textShadow,
  typography,
  variant,
} from 'styled-system';

import { TypographyProps } from './typography.types';

const Typography: FC<TypographyProps> = ({ as, ...props }) => {
  const TypographyElement = styled(as || 'p')(
    variant({
      scale: 'typography',
    }),
    compose(
      space,
      color,
      layout,
      border,
      position,
      boxShadow,
      typography,
      textShadow,
      system({
        cursor: true,
        textTransform: true,
      })
    )
  );

  return <TypographyElement {...props} />;
};

export default Typography;
