import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Table, Typography } from '@/elements';
import { Fraction } from '@/sdk';
import { BLOCKS_PER_YEAR } from '@/sdk';
import { getChainId } from '@/state/core/core.selectors';
import { StarSVG } from '@/svg';

import { MAIL_MARKET_HEADINGS } from '../../mail-market.data';
import { MAILMarketTableItemProps } from '../../mail-market.types';
import {
  isOnLocalStorage,
  removeFromLocalStorage,
} from '../../mail-market.utils';

const MAIL_MARKET_ASSET_ARRAY = [0, 1, 2, 3, 4];

const MAILMarketTableItem: FC<MAILMarketTableItemProps> = ({
  localAssets,
  setLocalAssets,
  data,
}) => {
  const { push } = useRouter();
  const chainId = useSelector(getChainId) as number;
  return (
    <Table
      hasButton
      specialRowHover
      headings={MAIL_MARKET_HEADINGS(data.symbol)}
      data={[
        {
          button: (
            <Box
              display="flex"
              width={['5rem', '5rem', '5rem', 'auto']}
              justifyContent={['center', 'center', 'center', 'flex-end']}
            >
              <Box
                width="1.2rem"
                onClick={(e) => {
                  e.stopPropagation();
                  isOnLocalStorage(data.market, localAssets)
                    ? setLocalAssets(
                        removeFromLocalStorage(data.market, localAssets)
                      )
                    : setLocalAssets(
                        localAssets.concat([
                          {
                            name: data.name,
                            symbol: data.symbol,
                            address: data.market,
                          },
                        ])
                      );
                }}
              >
                <StarSVG filled={isOnLocalStorage(data.market, localAssets)} />
              </Box>
            </Box>
          ),
          handleClick: () =>
            push(
              {
                pathname: Routes[RoutesEnum.MAILMarketPool],
                query: { pool: data.market },
              },
              undefined,
              {
                shallow: true,
              }
            ),
          items: [
            <Box key={v4()} display="flex" alignItems="center">
              <Box as="span" mr="M" display="inline-block" width="1.5rem">
                <data.Icon width="1.5rem" />
              </Box>
              <Typography variant="normal" fontWeight="500">
                {data.symbol}
              </Typography>
              {!isOnLocalStorage(data.market, localAssets) ? (
                <Typography
                  ml="L"
                  fontSize="S"
                  variant="normal"
                  hover={{ color: 'accent' }}
                >
                  (ADD)
                </Typography>
              ) : (
                <Typography
                  ml="L"
                  fontSize="S"
                  variant="normal"
                  hover={{ color: 'accent' }}
                >
                  (Remove)
                </Typography>
              )}
            </Box>,
            <Box
              key={v4()}
              gridGap="L"
              display="grid"
              gridTemplateColumns={['50% 50%', '50% 50%', '50% 50%', '1fr']}
            >
              <Typography
                fontSize="S"
                variant="normal"
                color="textSecondary"
                textTransform="uppercase"
              >
                Supply
              </Typography>
              <Typography
                fontSize="S"
                variant="normal"
                color="textSecondary"
                textTransform="uppercase"
              >
                Borrow
              </Typography>
            </Box>,
            MAIL_MARKET_ASSET_ARRAY.map((index) => (
              <Box
                key={v4()}
                gridGap="L"
                display="grid"
                gridTemplateColumns={['50% 50%', '50% 50%', '50% 50%', '1fr']}
              >
                <Typography variant="normal">
                  {`${Fraction.from(
                    data.supplyRates[index].mul(BLOCKS_PER_YEAR[chainId]),
                    ethers.utils.parseEther('0.01')
                  ).toSignificant(4)}%`}
                </Typography>
                <Typography variant="normal">{`${Fraction.from(
                  data.borrowRates[index].mul(BLOCKS_PER_YEAR[chainId]),
                  ethers.utils.parseEther('0.01')
                ).toSignificant(4)}%`}</Typography>
              </Box>
            )),
          ],
        },
      ]}
    />
  );
};

export default MAILMarketTableItem;
