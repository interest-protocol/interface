import { useTranslations } from 'next-intl';
import { always } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { SOCIAL_MEDIAS } from '@/constants';
import { Box, Typography } from '@/elements';
import { capitalize } from '@/utils';

export const ItemsCommunity: FC = always(
  <Box bg="background" pt="1.625rem" mt="1.5rem">
    <Container display="grid" cursor="pointer" gridTemplateColumns="1fr 1fr">
      {SOCIAL_MEDIAS.map((socialMediaData) => (
        <a
          href={socialMediaData.link}
          target="__blank"
          title={socialMediaData.title}
          key={v4()}
        >
          <Box
            display="flex"
            height="1.5rem"
            alignItems="center"
            mb="1.2rem"
            hover={{
              color: 'accent',
            }}
          >
            <socialMediaData.Logo />
            <Typography variant="normal" ml="M">
              {socialMediaData.title}
            </Typography>
          </Box>
        </a>
      ))}
    </Container>
  </Box>
);

export const ItemsNetwork: FC = () => {
  const t = useTranslations();

  const ETHLINK = 'https://ethereum.org/en/';
  const BNBLINK = 'https://www.bnbchain.org/en';
  return (
    <Box bg="background" pt="1.625rem" width="100vw">
      <Container>
        <a
          href="https://ethereum.org/en/"
          target="__blank"
          title={capitalize(t('common.network', { count: 1 }))}
        >
          <Typography variant="large" mb="1rem" hover={{ color: 'accent' }}>
            {ETHLINK}
          </Typography>
        </a>
        <a
          href="https://www.bnbchain.org/en"
          target="__blank"
          title={capitalize(t('common.network', { count: 1 }))}
        >
          <Typography variant="large" mb="1.625rem" hover={{ color: 'accent' }}>
            {BNBLINK}
          </Typography>
        </a>
      </Container>
    </Box>
  );
};
