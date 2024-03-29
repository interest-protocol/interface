import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Typography } from '@/elements';

import { GoBackProps } from './go-back.types';

const GoBack: FC<GoBackProps> = ({ route, routeBack }) => {
  const t = useTranslations();
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
      &larr; {t('common.back')}
    </Typography>
  ) : null;
};

export default GoBack;
