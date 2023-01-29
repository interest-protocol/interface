import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import Container from '@/components/container';
import { Box, Button, ResponsiveImage, Typography } from '@/elements';
import { TTranslatedMessage } from '@/interface';
import { TickSVG } from '@/svg';

import { REASONS_LIST } from './why-us.data';
import { FloatingCoins } from './why-us-animations';

const WhyUs: FC = () => {
  const t = useTranslations();

  return (
    <Box as="section" position="relative">
      <Container
        py="XL"
        alignItems="center"
        mt={['-5rem', '-5rem', '-5rem', 'NONE']}
        display={['flex', 'flex', 'flex', 'grid']}
        justifyItems={['center', 'center', 'center', 'start']}
        gridTemplateColumns={['unset', 'unset', 'unset', '1fr 1fr']}
        flexDirection={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'unset',
        ]}
      >
        <Box
          position="relative"
          mt={['XXXL', 'XXXL', 'XXXL', 'unset']}
          mr={['unset', 'unset', 'unset', 'XL']}
          maxWidth={['30rem', '30rem', '30rem', 'unset']}
        >
          <Box width="45%" mx="auto">
            <ResponsiveImage
              width="100%"
              alt="Interest Protocol User"
              path="home/why-us-user"
            />
          </Box>
          <FloatingCoins
            top="10%"
            left="17%"
            width="11%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage width="100%" alt="ETH" path="home/why-us-ETH" />
          </FloatingCoins>
          <FloatingCoins
            top="32%"
            left="24%"
            width="10%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage width="100%" alt="iJPY" path="home/why-us-iJPY" />
          </FloatingCoins>
          <FloatingCoins
            top="58%"
            left="16%"
            width="12%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage width="100%" alt="BTC" path="home/why-us-BTC" />
          </FloatingCoins>
          <FloatingCoins
            top="5%"
            left="75%"
            width="11%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage width="100%" alt="BNB" path="home/why-us-BNB" />
          </FloatingCoins>
          <FloatingCoins
            top="35%"
            left="72%"
            width="12.5%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage width="100%" alt="USDT" path="home/why-us-USDT" />
          </FloatingCoins>
          <FloatingCoins
            top="62%"
            left="78%"
            width="10%"
            position="absolute"
            delay={~~(Math.random() * 1500)}
          >
            <ResponsiveImage
              width="100%"
              alt="iTSLA"
              path="home/why-us-iTSLA"
            />
          </FloatingCoins>
        </Box>
        <Box
          pr="1.5rem"
          display="flex"
          flexDirection="column"
          width={['100%', '100%', '28rem']}
          pl={['1.25rem', '1.25rem', '3.75rem', '3.75rem']}
          pt={['1.875rem', '1.875rem', '1.875rem', '5rem']}
        >
          <Typography
            as="h2"
            mb="XL"
            variant="normal"
            fontStyle="normal"
            fontWeight="900"
            textAlign={['center', 'unset']}
            fontSize={['2.25rem', '2.25rem', '2.25rem', '2.75rem']}
            lineHeight={['2.743rem', '2.743rem', '2.743rem', '4.876rem']}
            textTransform="capitalize"
          >
            {t('landingPage.whyUs.title')}
          </Typography>
          {REASONS_LIST.map((item) => (
            <Box key={v4()} display="flex" alignItems="center">
              <Box minWidth="1.5rem">
                <TickSVG maxWidth="1.5rem" maxHeight="1.5rem" />
              </Box>
              <Typography
                ml="L"
                variant="normal"
                fontWeight="600"
                fontSize="1.125rem"
              >
                {t(item as TTranslatedMessage)}
              </Typography>
            </Box>
          ))}
          <a
            href="https://docs.interestprotocol.com/"
            target="__blank"
            rel="noreferrer"
          >
            <Button
              effect="hover"
              variant="primary"
              mt={['1.25rem', '1.25rem', '1.25rem', '3rem']}
            >
              <Typography
                variant="normal"
                fontSize="inherit"
                fontWeight="inherit"
                textTransform="uppercase"
              >
                {t('landingPage.whyUs.learn')}
              </Typography>
            </Button>
          </a>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyUs;
