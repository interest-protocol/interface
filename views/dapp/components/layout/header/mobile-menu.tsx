import Link from 'next/link';
import { FC } from 'react';

import { SOCIAL_MEDIAS } from '@/constants/social-media';
import { Box, Dropdown, Typography } from '@/elements';
import { BarsSVG, GitBookSVG } from '@/svg';

const MobileMenu: FC = () => (
  <>
    <Dropdown
      buttonMode
      mode="menu"
      header="FOLLOW US:"
      title={
        <Box display="flex" alignItems="center" justifyContent="center" mx="S">
          <Box as="span" display="inline-block" width="1rem">
            <BarsSVG width="100%" />
          </Box>
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
  </>
);

export default MobileMenu;
