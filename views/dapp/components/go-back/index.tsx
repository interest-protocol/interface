import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Typography } from '@/elements';

const GoBack: FC = () => {
  const { pathname, push } = useRouter();

  const backToHome = () => push(Routes[RoutesEnum.DApp]);

  return pathname != Routes[RoutesEnum.DApp] ? (
    <Typography
      mb="XL"
      color="accent"
      variant="normal"
      cursor="pointer"
      whiteSpace="nowrap"
      onClick={backToHome}
      hover={{ color: 'accentActive' }}
    >
      &larr; BACK
    </Typography>
  ) : null;
};

export default GoBack;
