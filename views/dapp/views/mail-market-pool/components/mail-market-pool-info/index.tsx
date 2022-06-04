import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { CopySVG, InfoSVG, InterestTokenSVG, UniSwapSVG } from '@/svg';
import { shortAccount } from '@/utils';

import { MAILMarketPoolProps } from '../../mail-market-pool.types';

const MAILMarketPoolInfo: FC<MAILMarketPoolProps> = ({ pool }) => {
  const data = {
    Icon: UniSwapSVG,
    name: 'Uni Swap',
    symbol: 'UNI',
    address: '0x9Bec2E1FFeF1F35e1F13c1E4ec290Ac39B88e235',
  };

  return (
    <Box
      p="XL"
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
            <Box display="flex" alignItems="center">
              <Typography variant="normal" my="M" color="textSecondary" mr="M">
                {shortAccount(data.address)}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                hover={{ color: 'hover' }}
              >
                <CopySVG width="1rem" />
              </Box>
            </Box>
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
