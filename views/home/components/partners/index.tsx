import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Slider from 'react-slick';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { PartnersBigBlockSVG, PartnersSmallBlockSVG } from '@/svg';

import { PARTNERS_DATA, SETTINGS } from './partners.data';

const Partners: FC = () => {
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
          <PartnersSmallBlockSVG
            maxWidth="125.4px"
            maxHeight="100%"
            width="125.4"
          />
        </Box>
        <Box position="absolute" right={['-17rem', '-19rem']} top="12rem">
          <PartnersBigBlockSVG maxWidth="339px" maxHeight="100%" width="339" />
        </Box>
        <Typography
          as="h2"
          variant="normal"
          fontWeight="900"
          textAlign="center"
          lineHeight="4.876rem"
          mb={['0.875rem', '0.875rem', '0.625rem', '1.025rem']}
          fontSize={['2.25rem', '2.25rem', '2.25rem', '2.75rem']}
          textTransform="capitalize"
        >
          {t('landingPage.partners.title')}
        </Typography>
        <Slider {...SETTINGS}>
          {PARTNERS_DATA.map(({ icon, link, name }) => (
            <a href={link} key={v4()} target="_blank" rel="noreferrer">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  height={['2.5rem', '3.5rem', '3.5rem', '3.5rem']}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                >
                  {icon}
                </Box>
                <Typography
                  variant="normal"
                  as="p"
                  mt="M"
                  fontWeight="600"
                  letterSpacing="1.5px"
                  textTransform="uppercase"
                >
                  {name}
                </Typography>
              </Box>
            </a>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};
export default Partners;
