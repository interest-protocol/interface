import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { ArrowSpecialSVG } from '@/svg';

const MenuItem: FC<{
  title: string;
  isDropdowm?: boolean;
  link?: string;
  data?: ReactNode;
}> = ({ title, isDropdowm, link, data }) => {
  const { push } = useRouter();
  const [openDropDown, setOpenDropDown] = useState(false);
  // const fadeStyles = useSpring({
  //   config: { ...config.stiff },
  //   from: { height: '0' },
  //   to: {
  //     height: openDropDown ? '7rem' : '0',
  //   },
  // });

  const [contentMaxHeight, setContentMaxHeight] = useState(0);
  const ref = useRef<any>();

  useEffect(() => {
    const calcContentMaxHeight = () => {
      ref && setContentMaxHeight(ref?.current?.scrollHeight);
    };

    calcContentMaxHeight();

    window.addEventListener('resize', () => calcContentMaxHeight());

    return () =>
      window.removeEventListener('resize', () => calcContentMaxHeight());
  }, [ref, contentMaxHeight]);

  const heig = useSpring({
    maxHeight: openDropDown ? `8rem` : '0px',
    config: { duration: 300 },
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
      <Container width="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => {
            isDropdowm && setOpenDropDown(!openDropDown);
            link && push(link);
          }}
          hover={{ color: 'accent' }}
          color={openDropDown ? 'accent' : 'unset'}
        >
          <Typography
            variant="button"
            fontSize="1.25rem"
            fontWeight="600"
            lineHeight="1.625rem"
          >
            {title}
          </Typography>
          {isDropdowm && (
            <Box
              width="0.496rem"
              height="0.496rem"
              transform={openDropDown ? 'rotate(180deg)' : 'rotate(0deg)'}
              display="flex"
            >
              <ArrowSpecialSVG width="100%" height="100%" fill="transparent" />
            </Box>
          )}
        </Box>
      </Container>
      {openDropDown && isDropdowm && (
        <animated.div style={{ overflow: 'hidden', ...heig }} ref={ref}>
          {data}
        </animated.div>
      )}
    </Box>
  );
};

export default MenuItem;
