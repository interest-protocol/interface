import styled from '@emotion/styled';
import css from '@styled-system/css';
import React, { forwardRef } from 'react';
import {
  border,
  color,
  compose,
  display,
  layout,
  shadow,
  space,
  system,
  typography,
} from 'styled-system';

import Box from '../box';
import { InputProps } from './input.types';
import { InputFieldProps } from './input.types';

const Input = forwardRef(
  (
    {
      focus,
      Prefix,
      Suffix,
      shieldProps,
      onClickPrefix,
      onClickSuffix,
      ...props
    }: InputProps,
    ref
  ) => {
    const InputField = styled.input<InputFieldProps>(
      css({
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        bg: 'transparent',
        overflow: 'hidden',
        '&:-internal-autofill-selected': {
          bg: 'transparent',
        },
        '&:focus-visible': {
          outline: 'none',
        },
        ...(focus && { transition: 'all 250ms ease-in-out', ':focus': focus }),
      }),
      compose(
        color,
        space,
        border,
        shadow,
        display,
        layout,
        typography,
        system({
          cursor: true,
          outline: true,
        })
      )
    );

    return (
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
    );
  }
);

Input.displayName = 'Input';

export default Input;
