import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Table, Typography } from '@/elements';
import { InterestTokenSVG, StarSVG } from '@/svg';

import { MAIL_MARKET_HEADINGS } from '../../mail-market.data';
import { MAILMarketTableItemProps } from '../../mail-market.types';
import {
  addressMatch,
  isOnLocalStorage,
  removeOnLocalStorage,
} from '../../mail-market.utils';

const MAILMarketTableItem: FC<MAILMarketTableItemProps> = ({
  Icon,
  symbol,
  address,
  name,
  currenciesCost,
  localAssets,
  setLocalAssets,
  data,
}) => {
  const { push } = useRouter();

  return (
    <Table
      hasButton
      specialRowHover
      headings={MAIL_MARKET_HEADINGS(symbol)}
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
                  isOnLocalStorage(symbol, localAssets)
                    ? setLocalAssets(removeOnLocalStorage(symbol, localAssets))
                    : setLocalAssets([
                        ...localAssets,
                        {
                          name,
                          symbol,
                          address,
                        },
                      ]);
                }}
              >
                <StarSVG filled={isOnLocalStorage(symbol, localAssets)} />
              </Box>
            </Box>
          ),
          handleClick: () =>
            push(
              {
                pathname: Routes[RoutesEnum.MAILMarketPool],
                query: { pool: symbol },
              },
              undefined,
              {
                shallow: true,
              }
            ),
          items: [
            <Box key={v4()} display="flex" alignItems="center">
              <Box as="span" mr="M" display="inline-block" width="1.5rem">
                {Icon ? (
                  <Icon width="1.5rem" />
                ) : (
                  <InterestTokenSVG width="1.5rem" />
                )}
              </Box>
              <Typography variant="normal" fontWeight="500">
                {symbol}
              </Typography>
              {!addressMatch(address, [localAssets ?? [], data]) ? (
                <Typography
                  ml="L"
                  fontSize="S"
                  variant="normal"
                  hover={{ color: 'accent' }}
                >
                  (ADD)
                </Typography>
              ) : (
                addressMatch(address, [[]]) && (
                  <Typography
                    ml="L"
                    fontSize="S"
                    variant="normal"
                    hover={{ color: 'accent' }}
                  >
                    (Remove)
                  </Typography>
                )
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
                Borrow
              </Typography>
              <Typography
                fontSize="S"
                variant="normal"
                color="textSecondary"
                textTransform="uppercase"
              >
                Supply
              </Typography>
            </Box>,
            ...currenciesCost.map(([borrow, supply]) => (
              <Box
                key={v4()}
                gridGap="L"
                display="grid"
                gridTemplateColumns={['50% 50%', '50% 50%', '50% 50%', '1fr']}
              >
                <Typography variant="normal">{borrow}</Typography>
                <Typography variant="normal">{supply}</Typography>
              </Box>
            )),
          ],
        },
      ]}
    />
  );
};

export default MAILMarketTableItem;
