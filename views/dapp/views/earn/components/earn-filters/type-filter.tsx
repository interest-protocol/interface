import { always, cond, equals, T } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Dropdown, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import { FarmTypeFilter } from '../../earn.types';
import { TypeFilterProps } from './earn-filters.types';

const parseFarmTypeByEnum = cond([
  [equals(FarmTypeFilter.All), always('All')],
  [equals(FarmTypeFilter.Stable), always('Stable')],
  [equals(FarmTypeFilter.Volatile), always('Volatile')],
  [T, always('All')],
]);

const TypeFilter: FC<TypeFilterProps> = ({ control, setValue }) => {
  const typeFilter = useWatch({ control, name: 'typeFilter' });

  return (
    <Box width={['48%', '48%', '48%', 'unset']} my={['M', 'M', 'M', 'NONE']}>
      <Typography
        as="label"
        fontSize="S"
        mb="M"
        variant="normal"
        display="inline-block"
      >
        Type:
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        width={['100%', '100%', '100%', '10rem']}
      >
        <Dropdown
          buttonMode
          mode="select"
          bg="accentAlternative"
          bgSelected="accentAlternativeBackground"
          emptyMessage="Not found Tokens"
          suffix={
            <Box ml="L" display={['none', 'none', 'none', 'block']}>
              <ArrowSVG width="0.6rem" height="0.6rem" />
            </Box>
          }
          title={
            <Box display="flex" width="100%" py="M" alignItems="center">
              <Typography variant="normal" whiteSpace="nowrap">
                {parseFarmTypeByEnum(typeFilter)}
              </Typography>
            </Box>
          }
          data={[
            {
              value: 'all',
              displayOption: 'All',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    All
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('typeFilter', FarmTypeFilter.All);
              },
            },
            {
              value: 'stable',
              displayOption: 'Stable',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Stable
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('typeFilter', FarmTypeFilter.Stable);
              },
            },
            {
              value: 'volatile',
              displayOption: 'Volatile',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Volatile
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('typeFilter', FarmTypeFilter.Volatile);
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default TypeFilter;
