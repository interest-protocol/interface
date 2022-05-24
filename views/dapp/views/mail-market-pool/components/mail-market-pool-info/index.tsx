import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { InfoSVG, InterestTokenSVG } from '@/svg';
import { shortAccount } from '@/utils';

import { MAIL_MARKET_DATA } from '../../../mail-market/mail-market.data';
import { MAILMarketPoolProps } from '../../mail-market-pool.types';

const MAILMarketPoolInfo: FC<MAILMarketPoolProps> = ({ pool }) => {
  const data = MAIL_MARKET_DATA.find(({ symbol }) => symbol == pool);

  return (
    <Box
      p="L"
      px="XXL"
      display="flex"
      bg="foreground"
      borderRadius="L"
      alignItems="center"
      justifyContent="space-between"
    >
      {data ? (
        <Box display="flex" alignItems="center">
          <Box width="5rem" mr="L">
            {data.Icon && <data.Icon width="100%" />}
          </Box>
          <Box>
            <Typography variant="normal" my="M">
              {data.name} ({data.symbol})
            </Typography>
            <Typography variant="normal" my="M" color="textSecondary">
              {shortAccount(data.address)}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <InterestTokenSVG width="5rem" />
        </Box>
      )}
      <Box color="textSecondary">
        <InfoSVG width="1.2rem" />
      </Box>
    </Box>
  );
};

export default MAILMarketPoolInfo;
