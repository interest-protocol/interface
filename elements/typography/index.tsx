import styled from '@emotion/styled';
import { css } from '@styled-system/css';
import React, { forwardRef } from 'react';
import {
  border,
  boxShadow,
  color,
  compose,
  flexbox,
  layout,
  position,
  space,
  system,
  textShadow,
  typography,
  variant,
} from 'styled-system';

import { TypographyProps } from './typography.types';

const Typography = forwardRef(
  ({ as, hover, active, ...props }: TypographyProps, ref) => {
    const TypographyElement = styled(as || 'p')(
      css({
        ...(hover && { transition: 'all 250ms ease-in-out', ':hover': hover }),
        ...(active && { ':active': active }),
      }),
      variant({
        scale: 'typography',
      }),
      compose(
        space,
        color,
        layout,
        border,
        flexbox,
        position,
        boxShadow,
        typography,
        textShadow,
        system({
          cursor: true,
          textTransform: true,
          whiteSpace: true,
        })
      )
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <TypographyElement ref={ref} {...props} />;
  }
);

Typography.displayName = 'Typography';

export default Typography;
