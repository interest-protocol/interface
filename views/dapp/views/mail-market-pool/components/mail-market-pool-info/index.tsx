import { FC } from 'react';

import { CopyToClipboard } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { InfoSVG, UnknownCoinSVG } from '@/svg';
import { shortAccount } from '@/utils';

import { MAILMarketPoolInfoProps } from '../../mail-market-pool.types';

const MAILMarketPoolInfo: FC<MAILMarketPoolInfoProps> = ({ metadata }) => {
  const Icon = TOKENS_SVG_MAP[metadata.symbol];

  return (
    <Box
      p="XL"
      display="flex"
      bg="foreground"
      borderRadius="L"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box width="5rem" mr="L">
          {Icon ? <Icon /> : <UnknownCoinSVG />}
        </Box>
        <Box>
          <Typography variant="normal" my="M">
            {metadata.name && `${metadata.name} (${metadata.symbol})`}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="normal" my="M" color="textSecondary" mr="M">
              {shortAccount(metadata.address)}
            </Typography>
            <CopyToClipboard
              display="flex"
              alignItems="center"
              address={metadata.address}
            />
          </Box>
        </Box>
      </Box>

      <Box
        color="textSecondary"
        as="span"
        cursor="help"
        data-tip={`The riskiest token of this market is ${metadata.symbol}`}
      >
        <InfoSVG width="1.2rem" />
      </Box>
    </Box>
  );
};

export default MAILMarketPoolInfo;
