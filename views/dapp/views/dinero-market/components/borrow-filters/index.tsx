import { FC } from 'react';

import { Box, Input, Typography } from '@/elements';

import { BorrowFiltersProps } from './borrow-filters.types';
import OnlyBorrowingFilter from './only-borrowing-filter';
import SortFilter from './sort-filter';

const BorrowFilters: FC<BorrowFiltersProps> = ({
  setValue,
  register,
  control,
}) => (
  <Box
    p="L"
    my="L"
    width="100%"
    display="flex"
    bg="foreground"
    borderRadius="L"
    justifyContent="space-between"
  >
    <Box
      width="100%"
      display="grid"
      columnGap={['0', '1rem']}
      gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}
    >
      <OnlyBorrowingFilter control={control} setValue={setValue} />
      <SortFilter control={control} setValue={setValue} />
      <Box
        gridColumn={['1 / span 2', '1 / span 2', '1 / span 2', '3 / span 2']}
      >
        <Typography
          mb="M"
          as="label"
          fontSize="S"
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
          placeholder="Search by name, symbol or address..."
          focus={{
            borderColor: 'accentAlternativeBackground',
          }}
        />
      </Box>
    </Box>
  </Box>
);

export default BorrowFilters;
