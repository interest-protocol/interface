import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { COMMON_STRINGS } from '@/constants';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { Layout } from '../../components';

const ComingSoon: FC = () => {
  const t = useTranslations();
  return (
    <Layout>
      <Box
        width="100vw"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <LogoSVG width="6rem" height="6rem" />
          <Typography variant="title2" mt="L">
            {t('common.soonDescription')}
          </Typography>
          <Link href={Routes[RoutesEnum.DineroMarket]}>
            <Button
              as="div"
              variant="primary"
              mt="M"
              hover={{ bg: 'accentActive' }}
            >
              {COMMON_STRINGS.arrowLeft + ' ' + t('common.backToDapp')}
            </Button>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default ComingSoon;
