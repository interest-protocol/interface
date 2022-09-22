import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Pulse } from '@/components';
import { COMMON_STRINGS } from '@/constants';
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
              {t('error.workingOn')} <strong>{COMMON_STRINGS.bnbMain}</strong>
            </Typography>
            <Typography variant="normal" mt="M">
              {t('error.switchTo')} <strong>{COMMON_STRINGS.bnbTest}</strong>
            </Typography>
          </Box>
        </Pulse>
      </Box>
    </Layout>
  );
};

export default ComingSoonBNBMainNet;
