import { FC } from 'react';

import { Box } from '@/elements';

import { LendAndBorrowTokensProps } from './mail-markets.types';

const LendAndBorrowTokens: FC<LendAndBorrowTokensProps> = ({ icons }) => {
  const [Icon, PairIcon] = icons;

  return PairIcon ? (
    <Box as="span" mx="S">
      <Box as="span" width="2.4rem">
        <Icon width="2.4rem" />
      </Box>
      <Box as="span" width="2.4rem" ml="-1rem">
        <PairIcon width="2.4rem" />
      </Box>
    </Box>
  ) : (
    <Box as="span" width="2.4rem" mx="S">
      <Icon width="2.4rem" />
    </Box>
  );
};

export default LendAndBorrowTokens;
