import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Table, Typography } from '@/elements';
import useRerender from '@/hooks/use-rerender';
import useLocalStorage from '@/hooks/use-storage';
import { shortAccount } from '@/utils';

import {
  MAIL_MARKET_HEADINGS,
  MAIL_MARKET_POOL_DATA,
} from './mail-market-pool.data';
import {
  IMailMarketData,
  MAILMarketTableProps,
} from './mail-market-pool.types';
import { addressMatch, mapFetchMarketData } from './mail-market-pool.utils';

const MAILMarketTable: FC<MAILMarketTableProps> = ({ control, popular }) => {
  const query = useWatch({ control, name: 'search' });
  const { fireRerender } = useRerender();

  const localCoin = useLocalStorage('localCoin', []) as ReadonlyArray<
    Omit<IMailMarketData, 'imgUrl'>
  > | null;

  const addTokenToLocalStorage =
    (data: Omit<IMailMarketData, 'imgUrl'>) =>
    (e: ReactMouseEvent<HTMLElement, MouseEvent>): void => {
      e.stopPropagation();
      const assets = JSON.parse(localStorage.getItem('localCoin') ?? '[]');
      localStorage.setItem('localCoin', JSON.stringify([...assets, data]));

      fireRerender();
    };

  const removeTokenFromLocalStorage =
    (target: string) =>
    (e: ReactMouseEvent<HTMLElement, MouseEvent>): void => {
      e.stopPropagation();
      const newAssets = (
        JSON.parse(localStorage.getItem('localCoin') ?? '[]') as ReadonlyArray<
          Omit<IMailMarketData, 'imgUrl'>
        >
      ).filter(({ address }) => address !== target);
      localStorage.setItem('localCoin', JSON.stringify(newAssets));

      fireRerender();
    };

  const queryFetchResult = [
    {
      symbol: 'INT',
      name: 'Interest Protocol',
      address: '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2',
    },
  ].filter(
    ({ address }) =>
      !addressMatch(address, [localCoin ?? [], MAIL_MARKET_POOL_DATA])
  );
  return (
    <Table
      headings={MAIL_MARKET_HEADINGS}
      data={(popular
        ? (!localCoin?.length
            ? mapFetchMarketData(queryFetchResult)
            : []
          ).concat(MAIL_MARKET_POOL_DATA)
        : mapFetchMarketData(queryFetchResult.concat(localCoin ?? []))
      )
        .filter(({ symbol, name, address }) =>
          [symbol, name, address].some((item) =>
            item.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
        )
        .map(({ imgUrl, symbol, name, address }) => ({
          handleClick: () => {
            console.log(symbol);
          },
          items: [
            <Box key={v4()} display="flex" alignItems="center">
              <Box as="span" mr="M" display="inline-block" width="1.5rem">
                <img width="100%" alt="uniswap" loading="lazy" src={imgUrl} />
              </Box>
              <Typography variant="normal" fontWeight="500">
                {symbol}
              </Typography>
              {!addressMatch(address, [
                localCoin ?? [],
                MAIL_MARKET_POOL_DATA,
              ]) ? (
                <Typography
                  ml="L"
                  fontSize="S"
                  variant="normal"
                  hover={{ color: 'accent' }}
                  onClick={addTokenToLocalStorage({
                    symbol,
                    name,
                    address,
                  })}
                >
                  (Remove)
                </Typography>
              ) : (
                addressMatch(address, [localCoin ?? []]) && (
                  <Typography
                    ml="L"
                    fontSize="S"
                    variant="normal"
                    hover={{ color: 'accent' }}
                    onClick={removeTokenFromLocalStorage(address)}
                  >
                    (ADD)
                  </Typography>
                )
              )}
            </Box>,
            name,
            shortAccount(address),
          ],
        }))}
    />
  );
};

export default MAILMarketTable;
