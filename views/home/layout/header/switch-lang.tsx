import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Dropdown } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { useLocalStorage } from '@/hooks';
import { BRFlagSVG, PTFlagSVG, USFlagSVG } from '@/svg';

const SwitchLang: FC = () => {
  const { locales, locale, asPath, push } = useRouter();
  const [localeDefault, setLocaleDefault] = useLocalStorage<string>(
    'interest-locale',
    locale as string
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
              {l}
              {process.env.PUBLIC_URL}
            </Box>
          ),
          onSelect: () => {
            push(asPath, undefined, {
              locale: l,
            });
            localeDefault !== l && setLocaleDefault(l);
          },
        })) as unknown as ReadonlyArray<IDropdownData>
      }
    />
  );
};

export default SwitchLang;
