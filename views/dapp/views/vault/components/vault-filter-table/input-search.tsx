import { ChangeEvent, FC } from 'react';

import { Box, Button, Input } from '@/elements';
import { SearchSVG } from '@/svg';

import { InputSearchProps } from './filter-table.types';

const InputSearch: FC<InputSearchProps> = ({ register, setValue }) => (
  <Box
    mr="M"
    bg="foreground"
    borderRadius="M"
    display="flex"
    alignItems="center"
    height="3rem"
    width={['100%', '100%', '100%', '19rem']}
  >
    <Input
      placeholder="Type an address, name or symbol"
      fontSize="0.875rem"
      shieldProps={{
        width: '100%',
      }}
      {...register(`search.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          setValue?.(`search.value`, v.target.value);
        },
      })}
      Suffix={
        <Button variant="secondary" bg="transparent">
          <SearchSVG color="#ddd" height="1rem" />
        </Button>
      }
    />
  </Box>
);

export default InputSearch;
