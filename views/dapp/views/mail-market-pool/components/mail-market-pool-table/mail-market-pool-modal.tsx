import { FC } from 'react';

import { Box, Typography } from '@/elements';

import { MAIL_MARKET_POOL_DATA } from '../../mail-market-pool.data';
import { MAILMarketPoolModalProps } from './mail-market-pool-table.types';

const MAILMarketPoolModal: FC<MAILMarketPoolModalProps> = ({
  type,
  address,
}) => {
  const { name } = MAIL_MARKET_POOL_DATA[type].find(
    (dataItem) => dataItem.address === address
  )!;

  return (
    <Box p="XL" bg="foreground" borderRadius="L">
      <Typography variant="normal" color="text">
        {type}-{name}
      </Typography>
    </Box>
  );
};
export default MAILMarketPoolModal;
