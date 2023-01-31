import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import {
  BinanceChainSVG,
  IntegrationsBigBlockSVG,
  IntegrationsSmallBlockSVG,
  SuiSVG,
} from '@/svg';

import { INTEGRATIONS_DATA } from './integrations.data';

const Integrations: FC = () => {
  const t = useTranslations();

  return (
    <Box backgroundImage="linear-gradient(360deg, rgba(221, 224, 230, 0.36) 35.88%, #E3E4E5 149.36%);">
      <Container py={['XL', 'XXXL']} position="relative">
        <Box
          top="3rem"
          left="-5rem"
          position="absolute"
          display={['none', 'block']}
        >
          <IntegrationsSmallBlockSVG
            maxWidth="125.4px"
            maxHeight="100%"
            width="125.4"
          />
        </Box>
        <Box position="absolute" right={['-17rem', '-19rem']} top="12rem">
          <IntegrationsBigBlockSVG
            maxWidth="339px"
            maxHeight="100%"
            width="339"
          />
        </Box>
        <Typography
          as="h2"
          variant="normal"
          fontWeight="900"
          textAlign="center"
          lineHeight="4.876rem"
          mb={['0.875rem', '0.875rem', '0.625rem', '0.625rem']}
          fontSize={['2.25rem', '2.25rem', '2.25rem', '2.75rem']}
          textTransform="capitalize"
        >
          {t('landingPage.integrations.title')}
        </Typography>
        <Box
          mt={['XL', 'XXL']}
          px={['L', 'XXL']}
          rowGap="2rem"
          columnGap="1rem"
          display="grid"
          justifyItems={['start', 'center']}
          gridTemplateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
          ]}
        >
          {INTEGRATIONS_DATA.map(({ icon, link }) => (
            <a href={link} key={v4()} target="_blank" rel="noreferrer">
              <Box height={['2.5rem', '3.5rem']}>{icon}</Box>
            </a>
          ))}
        </Box>
        <Box
          mt="XXL"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={['column', 'row']}
        >
          <Typography variant="normal" fontWeight="600" mr="M">
            {t('landingPage.integrations.poweredBy')}
          </Typography>
          <Box display="flex">
            <Box mx="M">
              <BinanceChainSVG
                maxHeight="1.3rem"
                maxWidth="100%"
                height="1.3rem"
              />
            </Box>
            <Box mx="M">
              <SuiSVG maxHeight="1.3rem" maxWidth="100%" height="1.3rem" full />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Integrations;
