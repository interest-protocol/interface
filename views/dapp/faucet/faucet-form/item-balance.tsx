import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { CopyToClipboard, Tooltip } from '@/components';
import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { ArrowSVG } from '@/svg';
import { capitalize } from '@/utils';

import { ItemBalanceProps } from './faucet-form.types';

const ItemBalance: FC<ItemBalanceProps> = ({
  SVG,
  symbol,
  objectsData,
  totalBalance,
  decimals,
}) => {
  const t = useTranslations();
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <>
      <Box py="XS">
        <Box mr="M" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" color="text">
            <SVG
              width="1rem"
              maxHeight="1rem"
              maxWidth="1rem"
              fill="currentColor"
            />
            <Typography ml="M" variant="normal">
              {FixedPointMath.toNumber(totalBalance, decimals)}
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
              ({objectsData.length})
            </Typography>
            {objectsData.length == 0 && (
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
                  data-tip={capitalize(t('common.moreDetails'))}
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
            )}
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
          <Box
            display="flex"
            justifyContent="space-between"
            key={v4()}
            py="XS"
            alignItems="center"
          >
            <Typography variant="normal" fontSize="S">
              Coin #1: 0.0432
            </Typography>
            <Box as="span">
              <CopyToClipboard data={'id'} />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            key={v4()}
            py="XS"
            alignItems="center"
          >
            <Typography variant="normal" fontSize="S">
              Coin #1: 0.0432
            </Typography>
            <Box as="span">
              <CopyToClipboard data={'id'} />
            </Box>
          </Box>
          {objectsData.map(({ balance, id }, index) => (
            <Box
              display="flex"
              justifyContent="space-between"
              key={v4()}
              py="XS"
              alignItems="center"
            >
              <Typography variant="normal" fontSize="S">
                Coin {index}: {FixedPointMath.from(balance).toNumber(decimals)}
              </Typography>
              <Box as="span">
                <CopyToClipboard data={id} />
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
