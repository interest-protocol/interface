import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Typography } from '@/elements';

import { GoBackProps } from './go-back.types';

const GoBack: FC<GoBackProps> = ({ route, routeBack }) => {
  const { pathname, push, back } = useRouter();

  const backToHome = () =>
    routeBack ? back() : push(Routes[route ?? RoutesEnum.DEX]);

  return pathname != Routes[RoutesEnum.DEX] ? (
    <Typography
      mb="XL"
      color="accent"
      variant="normal"
      cursor="pointer"
      whiteSpace="nowrap"
      textTransform="uppercase"
      onClick={backToHome}
      hover={{ color: 'accentActive' }}
    >
      &larr; Voltar
    </Typography>
  ) : null;
};

export default GoBack;
