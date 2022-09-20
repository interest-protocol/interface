/* eslint-disable react/jsx-no-literals */
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Pulse } from '@/components';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import Layout from '../../components/layout';

const ComingSoonBNBMainNet: FC = () => {
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
        <Pulse>
          <Box display="flex" flexDirection="column" alignItems="center">
            <LogoSVG width="6rem" height="6rem" />
            <Typography variant="title2" mt="L">
              {t('common.soonDescription')}
            </Typography>
            <Typography variant="normal" mt="M">
              {t('error.workingOn')} <strong>BNB Main Net</strong>.
            </Typography>
            <Typography variant="normal" mt="M">
              {t('error.switchTo')} <strong>BNB Test Net</strong>.
            </Typography>
          </Box>
        </Pulse>
      </Box>
    </Layout>
  );
};

export default ComingSoonBNBMainNet;
