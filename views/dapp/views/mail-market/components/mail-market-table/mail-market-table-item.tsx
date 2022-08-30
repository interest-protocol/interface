import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { not, o, propEq } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum, TOKENS_SVG_MAP } from '@/constants';
import { Box, Table, Typography } from '@/elements';
import { useIdAccount } from '@/hooks/use-id-account';
import { Fraction, TOKEN_SYMBOL } from '@/sdk';
import { BLOCKS_PER_YEAR } from '@/sdk';
import { StarSVG } from '@/svg';
import { toFixedToPrecision } from '@/utils';

import { MAIL_MARKET_HEADINGS } from '../../mail-market.data';
import { MAILMarketTableItemProps } from '../../mail-market.types';
import { isOnLocalStorage } from '../../mail-market.utils';

/**
 * @name MAIL_MARKET_ASSET_ARRAY
 * @description
 * This array indicate the order to get the borrow and supply rate values.
 * Last index (4 in this case) comes first because we want to render first
 * the pool main token where in my response it comes last
 * @example
 * // the api returns values like [BTC, WETH, USDC, USDT, MainToken]
 * APIResponse = [12, 11, 13, 14, 18]
 * // after iterate MAIL_MARKET_ASSET_ASSET and use each value as index we will get [MainToken, BTC, WETH, USDC, USDT]
 * result = [18, 12, 11, 13, 14]
 * */
const MAIL_MARKET_ASSET_ARRAY = [4, 0, 1, 2, 3];

const MAILMarketTableItem: FC<MAILMarketTableItemProps> = ({
  data,
  localAssets,
  setLocalAssets,
}) => {
  const { push } = useRouter();
  const { chainId } = useIdAccount();

  const Icon =
    TOKENS_SVG_MAP[data.symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

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
                p="L"
                width="3rem"
                height="3rem"
                borderRadius="50%"
                bg="bottomBackground"
                hover={{ bg: 'accent' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setLocalAssets(
                    isOnLocalStorage(data.market, localAssets)
                      ? localAssets.filter(o(not, propEq('market', data)))
                      : localAssets
                          .filter(o(not, propEq('market', data)))
                          .concat([
                            {
                              name: data.name,
                              symbol: data.symbol,
                              market: ethers.utils.getAddress(data.market),
                              token: ethers.utils.getAddress(data.token),
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
                query: {
                  pool: data.market,
                },
              },
              undefined,
              {
                shallow: true,
              }
            ),
          items: [
            <Box key={v4()} display="flex" alignItems="center">
              <Box as="span" mr="M" display="inline-block" width="1.5rem">
                <Icon width="1.5rem" />
              </Box>
              <Typography variant="normal" fontWeight="500">
                {data.symbol}
              </Typography>
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
            ...MAIL_MARKET_ASSET_ARRAY.map((index) =>
              data.supplyRates[index] ? (
                <Box
                  key={v4()}
                  gridGap="L"
                  display="grid"
                  gridTemplateColumns={['50% 50%', '50% 50%', '50% 50%', '1fr']}
                >
                  <Typography variant="normal">
                    {`${toFixedToPrecision(
                      Fraction.from(
                        data.supplyRates[index].mul(BLOCKS_PER_YEAR[chainId]),
                        ethers.utils.parseEther('0.01')
                      ).toSignificant(4)
                    )}%`}
                  </Typography>
                  <Typography variant="normal">{`${toFixedToPrecision(
                    Fraction.from(
                      data.borrowRates[index].mul(BLOCKS_PER_YEAR[chainId]),
                      ethers.utils.parseEther('0.01')
                    ).toSignificant(4)
                  )}%`}</Typography>
                </Box>
              ) : null
            ),
          ],
        },
      ]}
    />
  );
};

export default MAILMarketTableItem;
