import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { useI18n } from '@/hooks';
import { BRFlagSVG, PTFlagSVG, USFlagSVG } from '@/svg';

const SwitchLang: FC = () => {
  const { locales } = useRouter();
  const { currentLocale, changeLocale } = useI18n();

  return (
    <Dropdown
      title={
        <Box
          ml={['unset', '0.75rem']}
          mr={['L', '0.75rem']}
          width="1.25rem"
          height="1.25rem"
          borderRadius="2rem"
        >
          {currentLocale === 'en-US' ? (
            <USFlagSVG width="100%" height="100%" />
          ) : currentLocale === 'pt-PT' ? (
            <PTFlagSVG width="100%" height="100%" />
          ) : (
            <BRFlagSVG width="100%" height="100%" />
          )}
        </Box>
      }
      mode="menu"
      defaultValue={currentLocale}
      data={
        locales?.map((locale) => ({
          value: locale,
          displayOption: (
            <Box
              pl="M"
              display="flex"
              minWidth="17rem"
              height="3rem"
              alignItems="center"
            >
              <Box
                mx="0.75rem"
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
                fontWeight="600"
                fontSize="L"
                lineHeight="1.625rem"
              >
                {locale}
              </Typography>
              {process.env.PUBLIC_URL}
            </Box>
          ),
          onSelect: () => {
            console.log('>> currentLocale :: ', currentLocale);
            console.log('>> locale :: ', locale);
            console.log('>> changeLocale :: ', changeLocale);

            currentLocale !== locale && changeLocale(locale);
          },
        })) as ReadonlyArray<IDropdownData>
      }
    />
  );
};

export default SwitchLang;
