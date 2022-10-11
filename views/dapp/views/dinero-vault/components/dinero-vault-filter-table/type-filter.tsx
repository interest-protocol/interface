import { useTranslations } from 'next-intl';
import { always, cond, equals, T } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { VaultTypes } from '@/constants';
import { Box, Dropdown, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';
import { capitalize } from '@/utils';

import { FilterProps } from './filter-table.types';

const parseVaultTypeByEnum = cond([
  [equals(VaultTypes.All), always('All')],
  [equals(VaultTypes.DV), always('DV')],
  [T, always('All')],
]);

const TypeFilter: FC<FilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
  const type = useWatch({ control, name: 'type' });

  return (
    <Box width={['100%', '100%', '100%', 'unset']} my={['M', 'M', 'M', 'NONE']}>
      <Typography
        as="label"
        fontSize="S"
        mb="M"
        variant="normal"
        display="inline-block"
        textTransform="capitalize"
      >
        {t('common.type')}:
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        width={['100%', '100%', '100%', '10rem']}
        height="3rem"
        position="relative"
      >
        <Dropdown
          buttonMode
          mode="select"
          bg="accentAlternative"
          bgSelected="accentAlternativeBackground"
          suffix={
            <Box ml="L" width="0.6rem">
              <ArrowSVG width="100%" />
            </Box>
          }
          title={
            <Box display="flex" width="100%" py="S" alignItems="center">
              <Typography
                variant="normal"
                whiteSpace="nowrap"
                textTransform="capitalize"
              >
                {parseVaultTypeByEnum(type)}
              </Typography>
            </Box>
          }
          data={[
            {
              value: 'all',
              displayOption: capitalize(t('common.all')),
              displayTitle: (
                <Box display="flex" width="100%" py="S" alignItems="center">
                  <Typography
                    variant="normal"
                    whiteSpace="nowrap"
                    textTransform="capitalize"
                  >
                    {t('common.all')}
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('type', VaultTypes.All);
              },
            },
            {
              value: 'dv',
              displayOption: 'DV',
              displayTitle: (
                <Box display="flex" width="100%" py="S" alignItems="center">
                  <Typography
                    variant="normal"
                    whiteSpace="nowrap"
                    textTransform="capitalize"
                  >
                    DV
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('type', VaultTypes.DV);
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default TypeFilter;
