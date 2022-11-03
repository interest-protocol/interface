import styled from '@emotion/styled';
import { css } from '@styled-system/css';
import { FC } from 'react';
import {
  background,
  border,
  boxShadow,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  space,
  system,
  typography,
  variant,
} from 'styled-system';

import { BoxProps } from './box.types';

const Box: FC<BoxProps> = ({ as, hover, active, ...props }) => {
  const BoxElement = styled(as || 'div')(
    css({
      ...(hover && { transition: 'all 250ms ease-in-out', ':hover': hover }),
      ...(active && {
        transition: 'all 250ms ease-in-out',
        ':active': active,
      }),
    }),
    variant({
      prop: 'effect',
      scale: 'effects',
    }),
    compose(
      grid,
      space,
      color,
      border,
      layout,
      flexbox,
      position,
      boxShadow,
      typography,
      background,
      system({
        cursor: true,
        filter: true,
        rowGap: true,
        clipPath: true,
        columnGap: true,
        objectFit: true,
        transform: true,
        transition: true,
        whiteSpace: true,
        pointerEvents: true,
        backdropFilter: true,
        borderCollapse: true,
      })
    )
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <BoxElement {...props} />;
};

export default Box;
