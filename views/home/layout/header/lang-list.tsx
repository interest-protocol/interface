import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { useI18n } from '@/hooks';
import { BRFlagSVG, PTFlagSVG, USFlagSVG } from '@/svg';

import LangItem from './lang-item';

const LangList: FC = () => {
  const { locales } = useRouter();
  const { currentLocale } = useI18n();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      width="100%"
      flexDirection="column"
      alignItems="flex-end"
    >
      <Box width={['100%', '13.8rem']}>
        {locales?.map((locale) => (
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
                  {locale === 'en-US' ? (
                    <USFlagSVG width="100%" height="100%" />
                  ) : locale === 'pt-PT' ? (
                    <PTFlagSVG width="100%" height="100%" />
                  ) : (
                    <BRFlagSVG width="100%" height="100%" />
                  )}
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
            key={v4()}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LangList;
