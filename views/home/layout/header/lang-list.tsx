import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { useLocale } from '@/hooks';
import { getSafeLocaleSVG } from '@/utils';

import LangItem from './lang-item';

const LangList: FC = () => {
  const { currentLocale, locales, changeLocale } = useLocale();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      width="100%"
      flexDirection="column"
      alignItems="flex-end"
      bg="textInverted"
      pt="2.5rem"
      pb="1.875rem"
    >
      <Box width={['100%', '13.8rem']}>
        {locales.map((locale) => (
          <LangItem
            title={
              <Box
                display="flex"
                hover={{
                  color: locale === currentLocale ? 'disabled' : 'accent',
                }}
                alignItems="center"
                color={locale === currentLocale ? 'disabled' : 'unset'}
              >
                <Box
                  mr="0.75rem"
                  width={['1.5rem', '1.25rem']}
                  height={['1.5rem', '1.25rem']}
                  backgroundSize="cover"
                  borderRadius="2rem"
                >
                  {getSafeLocaleSVG(locale)}
                </Box>
                <Typography
                  variant="button"
                  fontWeight="500"
                  fontSize="1rem"
                  lineHeight="1.625rem"
                >
                  {locale}
                </Typography>
              </Box>
            }
            locale={locale}
            changeLocale={changeLocale}
            currentLocale={currentLocale}
            key={v4()}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LangList;
