import { FC } from 'react';

import { Box, Dropdown, Typography } from '@/elements';
import { IDropdownData } from '@/elements/dropdown/dropdown.types';
import { useLocale } from '@/hooks';
import { getSafeLocaleSVG } from '@/utils';

const SwitchLang: FC = () => {
  const { currentLocale, changeLocale, locales } = useLocale();

  return (
    <Dropdown
      title={
        <Box
          ml={['L', '0.75rem']}
          mr={['L', '0.75rem']}
          width="1.25rem"
          height="1.25rem"
          borderRadius="2rem"
        >
          {getSafeLocaleSVG(currentLocale)}
        </Box>
      }
      mode="menu"
      defaultValue={currentLocale}
      data={
        locales.map((locale) => ({
          value: locale,
          displayOption: (
            <Box
              pl="M"
              display="flex"
              minWidth="17rem"
              height="3rem"
              alignItems="center"
              hover={{
                color: currentLocale === locale ? 'unset' : 'textInverted',
              }}
            >
              <Box
                mx="0.75rem"
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
          ),
          onSelect: () => currentLocale !== locale && changeLocale(locale),
        })) as ReadonlyArray<IDropdownData>
      }
    />
  );
};

export default SwitchLang;
