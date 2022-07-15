import { FC } from 'react';

import { Box } from '@/elements';

import { LendAndBorrowTokensProps } from './earn.types';

const LendAndBorrowTokens: FC<LendAndBorrowTokensProps> = ({ icons }) => {
  const [Icon, PairIcon] = icons;

  return PairIcon ? (
    <Box
      as="span"
      mx="0.313rem"
      mb={['0.625rem', '0.625rem', 'unset', 'unset']}
    >
      <Box as="span" width="2.4rem">
        <Icon width="2.4rem" />
      </Box>
      <Box as="span" width="2.4rem" ml="-1rem">
        <PairIcon width="2.4rem" />
      </Box>
    </Box>
  ) : (
    <Box
      as="span"
      width="2.4rem"
      mx="0.313rem"
      mb={['0.625rem', '0.625rem', 'unset', 'unset']}
    >
      <Icon width="2.4rem" />
    </Box>
  );
};

export default LendAndBorrowTokens;
