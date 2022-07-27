import { FC } from 'react';

import { Container } from '@/components';
import { Box } from '@/elements';

import { StateProps } from '../../vault.types';
import InputSearch from './input-search';
import OptionButton from './option-button';
import TVLSelect from './tvl-select';

const FilterTable: FC<StateProps> = ({ state, setState }) => {
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
        options={['All', 'Investment', 'Swap']}
        whoIsSelected={state}
        setWhoIsSelected={setState}
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
