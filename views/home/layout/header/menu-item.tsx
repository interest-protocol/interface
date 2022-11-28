import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { ArrowSpecialSVG } from '@/svg';

import { MenuItemProps } from './header.types';

const AnimatedBox = animated(Box);

const MenuItem: FC<MenuItemProps> = ({ title, isDropdown, link, data, id }) => {
  const { push } = useRouter();
  const [openDropDown, setOpenDropDown] = useState(false);
  const fadeStyles = useSpring({
    config: { ...config.stiff },
    from: { height: '0rem' },
    to: {
      height: openDropDown ? '9rem' : '0rem',
    },
  });

  return (
    <Box
      width="100%"
      mb="1.5rem"
      display="flex"
      flexDirection="column"
      cursor="pointer"
      transition="transform 3s"
    >
      <Container
        width="100%"
        id={id ? `${id}-submenu` : undefined}
        onClick={() => {
          isDropdown && setOpenDropDown(!openDropDown);
          link && push(link);
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pointerEvents="none"
          hover={{ color: 'accent' }}
          color={openDropDown ? 'accent' : 'unset'}
        >
          <Typography
            variant="button"
            fontWeight="600"
            fontSize="1.25rem"
            lineHeight="1.625rem"
          >
            {title}
          </Typography>
          {isDropdown && (
            <Box
              display="flex"
              width="0.496rem"
              height="0.496rem"
              transform={openDropDown ? 'rotate(180deg)' : 'rotate(0deg)'}
            >
              <ArrowSpecialSVG
                width="100%"
                height="100%"
                fill="transparent"
                maxHeight="0.5rem"
                maxWidth="0.5rem"
              />
            </Box>
          )}
        </Box>
      </Container>
      <AnimatedBox overflow="hidden" style={fadeStyles}>
        {data}
      </AnimatedBox>
    </Box>
  );
};

export default MenuItem;
