import { FC } from 'react';
import toast from 'react-hot-toast';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { CopySVG, InfoSVG, UnknownCoinSVG } from '@/svg';
import { shortAccount } from '@/utils';

import { MAILMarketPoolInfoProps } from '../../mail-market-pool.types';

const MAILMarketPoolInfo: FC<MAILMarketPoolInfoProps> = ({ metadata }) => {
  // return null;
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(metadata.token || '');
    toast('Copied to clipboard');
  };

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
              {shortAccount(metadata.token)}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              onClick={copyToClipboard}
              hover={{ color: 'hover' }}
            >
              <CopySVG width="1rem" />
            </Box>
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
