import { FC } from 'react';

import { Box, Button, Input } from '@/elements';
import { SearchSVG } from '@/svg';

const InputSearch: FC = () => (
  <Box
    mr="M"
    bg="foreground"
    borderRadius="M"
    display="flex"
    alignItems="center"
    height="3rem"
  >
    <Input
      placeholder="Search"
      fontSize="0.875rem"
      width={['70%', '70%', '9rem']}
      Suffix={
        <Button variant="secondary" bg="transparent">
          <SearchSVG color="#ddd" height="1rem" />
        </Button>
      }
    />
  </Box>
);

export default InputSearch;
