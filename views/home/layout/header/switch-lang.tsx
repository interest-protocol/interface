import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { useLocalStorage } from '@/hooks';
import { BRFlagSVG, PTFlagSVG, USFlagSVG } from '@/svg';

const SwitchLang: FC = () => {
  const { locales, locale, asPath, push } = useRouter();
  const [localeDefault, setLocaleDefault] = useLocalStorage<string>(
    'interest-locale',
    locale || 'en-US'
  );
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
          {locale === 'en-US' ? (
            <USFlagSVG width="100%" height="100%" />
          ) : locale === 'pt-PT' ? (
            <PTFlagSVG width="100%" height="100%" />
          ) : (
            <BRFlagSVG width="100%" height="100%" />
          )}
        </Box>
      }
      mode="menu"
      defaultValue={locale}
      data={
        locales?.map((l) => ({
          value: l,
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
                {l === 'en-US' ? (
                  <USFlagSVG width="100%" height="100%" />
                ) : l === 'pt-PT' ? (
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
                {l}
              </Typography>
              {process.env.PUBLIC_URL}
            </Box>
          ),
          onSelect: () => {
            localeDefault !== l && setLocaleDefault(l);
            push(asPath, undefined, {
              locale: l,
            });
          },
        })) as unknown as ReadonlyArray<IDropdownData>
      }
    />
  );
};

export default SwitchLang;
