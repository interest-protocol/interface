import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box } from '@/elements';
import { isValidAccount } from '@/utils';

import { MAILMarketSearchBarResultsProps } from '../../mail-market.types';

const MAILMarketSearchBarResults: FC<MAILMarketSearchBarResultsProps> = ({
  control,
}) => {
  const query = useWatch({ control, name: 'search' });

  return query && isValidAccount(query) ? (
    <Box
      p="XL"
      left="0"
      top="5.5rem"
      zIndex={1}
      width="100%"
      boxShadow="0 0 0.6rem #0003"
      bg="foreground"
      borderRadius="L"
      position="absolute"
    ></Box>
  ) : null;
};

export default MAILMarketSearchBarResults;
