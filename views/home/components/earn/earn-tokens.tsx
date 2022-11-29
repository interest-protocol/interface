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
      <Box as="span" maxWidth="2.4rem" display="inline-block">
        <Icon width="100%" maxHeight="2.4rem" maxWidth="2.4rem" />
      </Box>
      <Box as="span" maxWidth="2.4rem" ml="-1rem" display="inline-block">
        <PairIcon width="100%" maxHeight="2.4rem" maxWidth="2.4rem" />
      </Box>
    </Box>
  ) : (
    <Box
      as="span"
      mx="0.313rem"
      maxWidth="2.4rem"
      display="inline-block"
      mb={['0.625rem', '0.625rem', 'unset', 'unset']}
    >
      <Icon width="100%" maxHeight="2.4rem" maxWidth="2.4rem" />
    </Box>
  );
};

export default LendAndBorrowTokens;
