import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { View } from '../../elements';

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LogoWrapper = styled(View)`
  width: 15rem;
  & > svg {
    animation: ${spin} 20s infinite linear;
  }
`;
