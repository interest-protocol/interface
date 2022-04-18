import Link from 'next/link';
import { FC } from 'react';

import { SOCIAL_MEDIAS } from '@/constants/social-media';
import { Box, Dropdown, Typography } from '@/elements';
import { BarsSVG, GitBookSVG } from '@/svg';

const MobileMenu: FC = () => (
  <Box display={['block', 'block', 'none']}>
    <Dropdown
      buttonMode
      mode="menu"
      header="FOLLOW US:"
      title={
        <Box
          width="1.6rem"
          height="1.6rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <BarsSVG width="1rem" height="1rem" />
        </Box>
      }
      data={[
        ...[
          ...SOCIAL_MEDIAS,
          {
            title: 'GitBook',
            Logo: GitBookSVG,
            link: 'https://docs.interestprotocol.com/',
          },
        ].map(({ title, link }) => ({
          value: title,
          displayOption: (
            <Link href={link}>
              <Typography
                px="M"
                py="L"
                width="100%"
                variant="normal"
                textAlign="center"
                textTransform="uppercase"
              >
                {title}
              </Typography>
            </Link>
          ),
        })),
        {
          value: 'feedback',
          displayOption: (
            <Box width="100%">
              <a href="https://forms.gle/aDP4wHvshLPKkKv97" target="__blank">
                <Typography
                  px="M"
                  py="L"
                  width="100%"
                  variant="normal"
                  textAlign="center"
                  bg="accentAlternative"
                  textTransform="uppercase"
                  hover={{
                    bg: 'warning',
                  }}
                >
                  Feedback
                </Typography>
              </a>
            </Box>
          ),
        },
      ]}
    />
  </Box>
);

export default MobileMenu;
