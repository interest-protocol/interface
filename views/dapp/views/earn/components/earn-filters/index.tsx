import { FC } from 'react';

import { Box, Input, Typography } from '@/elements';

import { EarnFiltersProps } from '../../earn.types';
import SortFilter from './sort-filter';
import StakeFilter from './stake-filter';
import TypeFilter from './type-filter';

const EarnFilters: FC<EarnFiltersProps> = ({ setValue, register, control }) => (
  <Box
    p="L"
    my="L"
    borderRadius="L"
    bg="foreground"
    width="100%"
    display="flex"
    justifyContent="space-between"
  >
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      flexWrap="wrap"
    >
      <TypeFilter control={control} setValue={setValue} />
      <StakeFilter control={control} setValue={setValue} />
      <SortFilter control={control} setValue={setValue} />
      <Box width={['48%', '48%', '48%', 'unset']}>
        <Typography
          as="label"
          fontSize="S"
          mb="M"
          variant="normal"
          display="inline-block"
        >
          Search
        </Typography>
        <Input
          py="0.9rem"
          color="text"
          type="text"
          width="100%"
          bg="bottomBackground"
          borderRadius="M"
          border="1px solid"
          borderColor="background"
          {...register('search')}
          fontSize="S"
          placeholder="Search by name or symbol..."
          focus={{
            borderColor: 'accentAlternativeBackground',
          }}
        />
      </Box>
    </Box>
  </Box>
);

export default EarnFilters;
