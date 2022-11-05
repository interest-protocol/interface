import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Input, Typography } from '@/elements';
import { capitalize } from '@/utils';

import OnlyBorrowingFilter from './only-synthesized-filter';
import SortFilter from './sort-filter';
import { SyntheticMarketFiltersProps } from './synthetics-filters.types';

const BorrowFilters: FC<SyntheticMarketFiltersProps> = ({
  setValue,
  register,
  control,
}) => {
  const t = useTranslations();

  return (
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
            textTransform="capitalize"
          >
            {t('common.search')}
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
            placeholder={capitalize(t('common.searchTokenInputDescription'))}
            focus={{
              borderColor: 'accentAlternativeBackground',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BorrowFilters;
