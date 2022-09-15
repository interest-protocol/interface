import { FC } from 'react';

import { Container } from '@/components';
import { Box } from '@/elements';
import { useLocale } from '@/hooks';

import { LangItemProps } from './header.types';

const LangItem: FC<LangItemProps> = ({ title, locale }) => {
  const { currentLocale, changeLocale } = useLocale();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      cursor={currentLocale === locale ? 'default' : 'pointer'}
      transition="transform 3s"
      mb="1.5rem"
    >
      <Container
        width="100%"
        onClick={() => {
          currentLocale !== locale && changeLocale(locale);
        }}
      >
        {title}
      </Container>
    </Box>
  );
};

export default LangItem;