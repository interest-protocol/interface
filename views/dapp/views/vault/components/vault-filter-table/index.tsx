import { FC, useState } from 'react';

import { Container } from '@/components';
import { Box } from '@/elements';

import InputSearch from './input-search';
import OptionButton from './option-button';
import TVLSelect from './tvl-select';

const FilterTable: FC = () => {
  const [whoIsSelected, setWhoIsSelected] = useState('All');
  return (
    <Container
      dapp
      px="M"
      width="100%"
      mt="L"
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'column', 'row']}
    >
      <OptionButton
        options={['All', 'Single', 'LP']}
        whoIsSelected={whoIsSelected}
        setWhoIsSelected={setWhoIsSelected}
      />
      <Box
        height={['auto', 'auto', '3rem']}
        display="flex"
        mt={['M', 'M', 'unset']}
      >
        <InputSearch />
        <TVLSelect />
      </Box>
    </Container>
  );
};

export default FilterTable;
