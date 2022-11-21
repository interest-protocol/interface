import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';
import { capitalize } from '@/utils';

import { EARN_TYPES } from './automate.data';

const Automate: FC = () => {
  const t = useTranslations();
  const { push } = useRouter();

  return (
    <Box bg="background" pb="XXL" as="section">
      <Container as="section" pt={['1.875rem', '5.813rem']} textAlign="center">
        <Typography
          as="h2"
          variant="normal"
          fontWeight="900"
          textAlign="center"
          lineHeight="4.876rem"
          mb={['0.875rem', '0.875rem', '0.625rem', '0.625rem']}
          fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
          textTransform="capitalize"
        >
          {t('landingPage.vaultSectionTitle')}
        </Typography>
        <Typography
          variant="normal"
          fontWeight="500"
          fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
          lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
        >
          {t('landingPage.vaultSectionSubtitle')}
        </Typography>
        <Box
          mt={['1.25rem', '4.313rem']}
          display="flex"
          justifyContent="space-around"
          flexDirection={['column', 'row']}
        >
          {EARN_TYPES.map((type) => (
            <Box key={v4()} textAlign="center" mb="L" mx="L">
              <Typography
                variant="large"
                as="h3"
                fontWeight="700"
                fontSize="2rem"
                textTransform="capitalize"
              >
                {type}
              </Typography>
              <Box width="100%" mx="auto">
                <ResponsiveImage
                  alt={type}
                  width="100%"
                  path={`home/${type}`}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          effect="hover"
          variant="primary"
          onClick={() => push(Routes[RoutesEnum.Farms])}
        >
          {capitalize(t('common.earn'))}
        </Button>
      </Container>
    </Box>
  );
};

export default Automate;
