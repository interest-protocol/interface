import { useTranslations } from 'next-intl';
import { toPairs } from 'ramda';
import { FC } from 'react';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';
import { v4 } from 'uuid';

import { Container, FlipMemberCard } from '@/components';
import { SVGProps } from '@/components/svg/svg.types';
import { Box, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { ADVISOR_MEMBERS, SOCIAL_SVG } from './advisors.data';
import { Image } from './advisors.styles';

const Advisors: FC = () => {
  const t = useTranslations();

  return (
    <Box bg="foreground">
      <Container as="section" py={['XL', 'XXL']} textAlign="center">
        <Typography
          as="h2"
          variant="normal"
          fontWeight="900"
          textAlign="center"
          lineHeight="4.876rem"
          fontSize={['2.75rem', '2.75rem', '4rem', '4rem']}
        >
          {t('landingPage.advisorTitle')}
        </Typography>
        <Box
          pt="XL"
          display="grid"
          mx={['L', 'XXXL']}
          gridRowGap={['2rem', '5rem']}
          gridColumnGap={['3rem', '3rem', '3rem', '7rem']}
          gridTemplateColumns={[
            '1fr',
            '1fr 1fr',
            '1fr 1fr',
            '1fr 1fr',
            '1fr 1fr 1fr',
          ]}
        >
          {ADVISOR_MEMBERS.map(
            ({ name, role, social, image, bio, depsBio }) => (
              <Box key={v4()} as="article">
                <FlipMemberCard height={['23rem', '22rem']}>
                  <Box
                    width="100%"
                    height="100%"
                    position="relative"
                    className="flipWrapper"
                  >
                    <Box
                      mb="L"
                      height="100%"
                      overflow="hidden"
                      position="relative"
                      className="flipImage"
                    >
                      <Box as="picture">
                        <source
                          type="image/webp"
                          srcSet={`/images/web/advisor/${image}.webp 800w, /images/web/advisor/${image}.webp`}
                        />
                        <source
                          type="image/png"
                          srcSet={`/images/min/advisor/${image}.png 800w, /images/min/advisor/${image}.png`}
                        />
                        <Image
                          alt={name}
                          width="100%"
                          height="100%"
                          loading="lazy"
                          decoding="async"
                          src={`/images/min/advisor/${image}.png`}
                        />
                      </Box>
                      <Box
                        p="L"
                        pt="XXL"
                        pl="XXL"
                        right="0"
                        bottom="0"
                        width="8rem"
                        position="absolute"
                        backgroundImage="linear-gradient(135deg, #0000 45%, #000A)"
                      >
                        <LogoSVG
                          width="100%"
                          maxHeight="8rem"
                          maxWidth="8rem"
                        />
                      </Box>
                    </Box>
                    <Box
                      px="L"
                      py="XL"
                      height="100%"
                      display="flex"
                      bg="foreground"
                      overflow="hidden"
                      alignItems="center"
                      className="flipBio"
                      flexDirection="column"
                      border="0.15rem solid"
                      borderColor="outline"
                      borderBottom="0.5rem solid"
                      borderBottomColor="accent"
                    >
                      <Box width="4rem">
                        <LogoSVG
                          width="100%"
                          maxHeight="4rem"
                          maxWidth="4rem"
                        />
                      </Box>
                      <Typography
                        mt="L"
                        variant="normal"
                        lineHeight="1.6"
                        textAlign="left"
                        fontSize="0.9rem"
                      >
                        {t(
                          bio as MessageKeys<IntlMessages, keyof IntlMessages>,
                          depsBio
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </FlipMemberCard>
                <Typography
                  as="h3"
                  variant="normal"
                  fontWeight="bold"
                  letterSpacing="1.5px"
                  textTransform="uppercase"
                >
                  {name}
                </Typography>
                <Typography variant="normal">{role}</Typography>
                <Box mt="M">
                  {toPairs(social).map(([network, link]) => {
                    const Icon = SOCIAL_SVG[network] as FC<SVGProps>;
                    return (
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        key={v4()}
                      >
                        <Box
                          mx="M"
                          as="span"
                          width="1.6rem"
                          display="inline-block"
                          hover={{
                            color: 'accent',
                          }}
                        >
                          <Icon
                            width="100%"
                            maxHeight="1.6rem"
                            maxWidth="1.6rem"
                          />
                        </Box>
                      </a>
                    );
                  })}
                </Box>
              </Box>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};
export default Advisors;
