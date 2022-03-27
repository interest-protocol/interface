import React, { forwardRef } from 'react';

import Box from '../box';
import InputField from './input.styles';
import { InputProps } from './input.types';

const Input = forwardRef(
  (
    {
      Prefix,
      Suffix,
      shieldProps,
      onClickPrefix,
      onClickSuffix,
      ...props
    }: InputProps,
    ref
  ) => (
    <Box display="flex" overflow="hidden" {...shieldProps}>
      {Prefix && (
        <Box
          display="flex"
          alignItems="center"
          onClick={onClickPrefix}
          {...(onClickPrefix && { cursor: 'pointer' })}
        >
          {Prefix}
        </Box>
      )}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/* @ts-ignore */}
      <InputField px="L" color="text" ref={ref} {...props} />
      {Suffix && (
        <Box
          display="flex"
          minWidth="3rem"
          alignItems="center"
          justifyContent="center"
          onClick={onClickSuffix}
          {...(onClickSuffix && { cursor: 'pointer' })}
        >
          {Suffix}
        </Box>
      )}
    </Box>
  )
);

Input.displayName = 'Input';

export default Input;
