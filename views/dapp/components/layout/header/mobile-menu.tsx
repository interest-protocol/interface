import Link from 'next/link';
import { FC } from 'react';

import { GAAction, GACategory } from '@/constants/google-analytics';
import { SOCIAL_MEDIAS } from '@/constants/social-media';
import { Box, Dropdown, Typography } from '@/elements';
import { BarsSVG, GitBookSVG } from '@/svg';
import { logEvent } from '@/utils/analytics';

const MobileMenu: FC = () => {
  const trackHeaderNavigation = (label: string) => () =>
    logEvent(GACategory.HeaderNavigation, GAAction.MobileNavigate, label);

  return (
    <>
      <Dropdown
        buttonMode
        mode="menu"
        header="FOLLOW US:"
        title={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="S"
          >
            <Box as="span" display="inline-block" width="1rem">
              <BarsSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
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
                <a
                  href="https://forms.gle/aDP4wHvshLPKkKv97"
                  target="__blank"
                  onClick={trackHeaderNavigation('feedback')}
                >
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
};

export default MobileMenu;
