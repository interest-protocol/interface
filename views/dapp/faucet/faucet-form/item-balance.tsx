import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { CopyToClipboard } from '@/components';
import { Box, Typography } from '@/elements';
import { AddressZero } from '@/sdk';
import { ArrowSVG } from '@/svg';

import { ItemBalanceProps } from './faucet-form.types';

const ItemBalance: FC<ItemBalanceProps> = ({
  SVG,
  symbol,
  objectNumbers,
  totalBalance,
}) => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <Box py="XS">
      <Box mr="M" display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <SVG width="1rem" maxHeight="1rem" maxWidth="1rem" />
          <Typography ml="M" variant="normal">
            {totalBalance}
          </Typography>
        </Box>
        <Box
          display="grid"
          alignItems="center"
          gridTemplateColumns={`4rem 2rem`}
        >
          <Typography variant="normal" color="textSecondary">
            {symbol}({objectNumbers})
          </Typography>
          <Box as="span" cursor="pointer">
            <Box
              as="span"
              ml="1rem"
              display="inline-block"
              width="0.5rem"
              color="text"
              data-tip="More Details"
              hover={{ color: 'accent' }}
              onClick={() => setOpenDetails(!openDetails)}
            >
              <ArrowSVG
                width="100%"
                maxWidth="1rem"
                maxHeight="1rem"
                fill="currentColor"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        pl="M"
        bg="background"
        borderRadius="M"
        height={openDetails ? 'auto' : '0px'}
        position="relative"
        overflowY={'hidden'}
        transition="height 1s"
      >
        {[1, 2, 3, 4].map((item) => (
          <Box
            mr="M"
            display="flex"
            justifyContent="space-between"
            key={v4()}
            py="XS"
          >
            <Typography variant="normal" fontSize="S">
              Coin {item}: 0.00034
            </Typography>
            <Box as="span">
              <CopyToClipboard address={AddressZero} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ItemBalance;
