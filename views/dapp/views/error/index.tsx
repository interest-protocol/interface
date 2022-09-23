import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Typography } from '@/elements';
import { TimesSVG } from '@/svg';

const ErrorView: FC<{ message: string }> = ({ message }) => {
  const { push } = useRouter();
  const goHome = () => push(Routes[RoutesEnum.DApp]);
  const t = useTranslations();

  return (
    <>
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          mb="L"
          width="10rem"
          height="10rem"
          color="error"
          overflow="hidden"
          borderRadius="50%"
          border="0.3rem solid"
        >
          <TimesSVG width="100%" height="100%" />
        </Box>
        <Typography variant="title3">{message}</Typography>
        <Button variant="primary" mt="XL" onClick={goHome}>
          &larr; {t('common.back')}
        </Button>
      </Box>
    </>
  );
};

export default ErrorView;
