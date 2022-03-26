import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
`;

const Pulse = styled.div`
  animation: ${pulse} 2s infinite ease-in-out;
`;

export default Pulse;
