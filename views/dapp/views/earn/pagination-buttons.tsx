import { FC } from 'react';

import { Container } from '@/components';
import { Box, Button, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import { PaginationButtonProps } from './earn.types';

const PaginationButton: FC<PaginationButtonProps> = ({
  setStepData,
  stepData,
  farmsSize,
  poolSize,
  type,
}) => {
  return (
    <Container dapp bg="foreground" display="flex" justifyContent="center">
      <Button
        variant="secondary"
        bg="background"
        width="8rem"
        mr="XL"
        onClick={() => setStepData(stepData - 9)}
        disabled={stepData == 0}
        cursor={stepData == 0 ? 'not-allowed' : 'pointer'}
      >
        <Box display="flex" alignItems="center" py="S" justifyContent="center">
          <Box width="0.8rem" height="0.8rem" transform="rotate(90deg)">
            <ArrowSVG width="100%" height="100%" />
          </Box>
          <Typography variant="normal" ml="M">
            Previous
          </Typography>
        </Box>
      </Button>
      <Button
        variant="secondary"
        bg="background"
        width="8rem"
        onClick={() => setStepData(stepData + 9)}
        disabled={type == 'farms' ? stepData > farmsSize : stepData > poolSize}
        cursor={
          type == 'farms'
            ? stepData > farmsSize
              ? 'not-allowed'
              : 'pointer'
            : stepData > poolSize
            ? 'not-allowed'
            : 'pointer'
        }
      >
        <Box display="flex" alignItems="center" py="S" justifyContent="center">
          <Typography variant="normal" mr="M">
            Next
          </Typography>
          <Box width="0.8rem" height="0.8rem" transform="rotate(270deg)">
            <ArrowSVG width="100%" height="100%" />
          </Box>
        </Box>
      </Button>
    </Container>
  );
};

export default PaginationButton;
