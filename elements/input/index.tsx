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
      <Box flex="1">
        <InputField
          px="L"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          color="text"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={ref}
          {...props}
        />
      </Box>
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
