import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Table, Typography } from '@/elements';
import { USDCoinSVG } from '@/svg';
import { formatDollars, formatMoney } from '@/utils';

import {
  MAIL_MARKET_POOL_DATA,
  MAIL_MARKET_POOL_HEADINGS,
  MY_MAIL_MARKET_POOL_HEADINGS,
} from '../../mail-market-pool.data';
import { MAILMarketPoolTableProps } from './mail-market-pool-table.types';

const MAILMarketTable: FC<MAILMarketPoolTableProps> = ({ type, favorite }) => {
  const data = favorite
    ? type === 'borrow'
      ? [
          {
            Icon: USDCoinSVG,
            symbol: 'INT',
            name: 'Interest Protocol',
            address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
            apr: 75,
            rewardApy: 15,
          },
        ]
      : []
    : MAIL_MARKET_POOL_DATA[type];

  return (
    <Box mt="XL">
      <Typography pt="L" variant="normal" textTransform="capitalize">
        {favorite && 'My '}
        {type} Market
      </Typography>
      <Table
        headings={
          (favorite ? MY_MAIL_MARKET_POOL_HEADINGS : MAIL_MARKET_POOL_HEADINGS)[
            type
          ]
        }
        data={data.map(({ Icon, symbol, apr }) => ({
          handleClick: () => {
            console.log(symbol);
          },
          items: [
            <Box key={v4()} display="flex" alignItems="center">
              <Box as="span" mr="M" display="inline-block" width="1.5rem">
                <Icon width="100%" />
              </Box>
              <Typography variant="normal" fontWeight="500">
                {symbol}
              </Typography>
            </Box>,
            `${type == 'borrow' ? '-' : ''} ${apr}%`,
            ...(favorite
              ? [
                  <Box key={v4()}>
                    <Typography variant="normal">
                      {formatMoney(653178)}
                    </Typography>
                    <Typography
                      mt="S"
                      fontSize="S"
                      color="success"
                      fontWeight="500"
                      variant="normal"
                    >
                      {formatDollars(872)}
                    </Typography>
                  </Box>,
                ]
              : []),
            ...(type === 'borrow' ? [favorite ? '15%' : 634925789] : []),
          ],
        }))}
      />
    </Box>
  );
};

export default MAILMarketTable;
