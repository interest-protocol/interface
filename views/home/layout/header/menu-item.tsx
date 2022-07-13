import { useRouter } from 'next/router';
import { FC, ReactNode, useState } from 'react';

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
  return (
    <Box
      width="100%"
      mb="1.5rem"
      display="flex"
      flexDirection="column"
      cursor="pointer"
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
      {openDropDown && isDropdowm && data}
    </Box>
  );
};

export default MenuItem;
