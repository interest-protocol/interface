import { FC } from 'react';

import { Container } from '@/components';
import { Box } from '@/elements';

import { VaultFiltersProps } from '../../vault.types';
import InputSearch from './input-search';
import TypeFilter from './type-filter';

const FilterTable: FC<VaultFiltersProps> = ({
  register,
  control,
  setValue,
}) => {
  return (
    <Container
      width={['93%', '93%', '93%', '100%']}
      borderRadius="1rem"
      mt="L"
      display="flex"
      bg={['foreground', 'foreground', 'foreground', 'transparent']}
      justifyContent="space-between"
      alignItems="center"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <TypeFilter control={control} setValue={setValue} />
      <Box
        height={['auto', 'auto', 'auto', '3rem']}
        display="flex"
        mt={['M', 'M', 'M', 'unset']}
        width={['100%', '100%', '100%', 'unset']}
      >
        <InputSearch register={register} setValue={setValue} />
      </Box>
    </Container>
  );
};

export default FilterTable;
