import { FC } from 'react';

import { Tooltip } from '@/components';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { TimesSVG } from '@/svg';

import { ErrorButtonProps } from '../farm-details.types';

const ErrorButton: FC<ErrorButtonProps> = ({ error }) => (
  <>
    <Button
      px="0"
      mr="S"
      bg="error"
      width="100%"
      cursor="help"
      data-tip={error}
      variant="primary"
    >
      <Box
        as="span"
        border="1px solid"
        borderRadius="1rem"
        alignItems="center"
        display="inline-flex"
        justifyContent="center"
      >
        <TimesSVG
          width="100%"
          maxWidth="1rem"
          maxHeight="1rem"
          strokeWidth="2px"
        />
      </Box>
    </Button>
    <Tooltip />
  </>
);

export default ErrorButton;
