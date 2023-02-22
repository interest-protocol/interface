import { useTranslations } from 'next-intl';
import { FC } from 'react';

import Box from '@/elements/box';
import Button from '@/elements/button';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import Tooltip from '../tooltip';
import { ErrorButtonProps } from './error-button.types';

const ErrorButton: FC<ErrorButtonProps> = ({
  error,
  styleProps,
  functionName,
}) => {
  const t = useTranslations();
  return (
    <>
      <Button
        {...styleProps}
        px="L"
        mr="S"
        bg="error"
        cursor="help"
        data-tip={error}
      >
        <Box
          as="span"
          borderRadius="1rem"
          alignItems="center"
          display="inline-flex"
          justifyContent="center"
        >
          <InfoSVG
            width="100%"
            maxWidth="1rem"
            maxHeight="1rem"
            strokeWidth="2px"
          />
          <Box as="span" ml="S">
            {capitalize(t('common.error')) + ': ' + functionName}
          </Box>
        </Box>
      </Button>
      <Tooltip />
    </>
  );
};

export default ErrorButton;
