import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { CopyToClipboard, Tooltip } from '@/components';
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
    <>
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
            gridTemplateColumns={`3rem 1rem 1rem`}
          >
            <Typography variant="normal" color="textSecondary">
              {symbol}
            </Typography>
            <Typography variant="normal" color="textSecondary">
              ({objectNumbers})
            </Typography>
            <Box
              as="span"
              cursor="pointer"
              onClick={() => setOpenDetails(!openDetails)}
            >
              <Box
                as="span"
                ml="1rem"
                display="inline-block"
                width="0.5rem"
                color="text"
                data-tip="More Details"
                hover={{ color: 'accent' }}
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
          px="M"
          py={openDetails ? 'M' : 'unset'}
          bg="background"
          borderRadius="M"
          height={openDetails ? 'auto' : '0px'}
          position="relative"
          overflowY={'hidden'}
          transition="height 1s"
        >
          {[1, 2, 3, 4].map((item) => (
            <Box
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
      <Tooltip />
    </>
  );
};

export default ItemBalance;
