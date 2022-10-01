import { FC } from 'react';

import { Container } from '@/components';
import { Box } from '@/elements';

import { FilterTableProps } from './filter-table.types';
import InputSearch from './input-search';
import OptionButton from './option-button';

const FilterTable: FC<FilterTableProps> = ({
  state,
  setState,
  register,
  setValue,
}) => {
  return (
    <Container
      dapp
      px="M"
      width="100%"
      mt="L"
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <OptionButton
        options={['All', 'LP']}
        whoIsSelected={state}
        setWhoIsSelected={setState}
      />
      <Box
        height={['auto', 'auto', 'auto', '3rem']}
        display="flex"
        mt={['M', 'M', 'M', 'unset']}
      >
        <InputSearch register={register} setValue={setValue} />
      </Box>
    </Container>
  );
};

export default FilterTable;
