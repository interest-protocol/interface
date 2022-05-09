import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Table, Typography } from '@/elements';
import useRerender from '@/hooks/use-rerender';
import useLocalStorage from '@/hooks/use-storage';
import { shortAccount } from '@/utils';

import { MAIL_MARKET_DATA, MAIL_MARKET_HEADINGS } from './mail-market.data';
import { IMailMarketData, MAILMarketTableProps } from './mail-market.types';
import { addressMatch, mapFetchMarketData } from './mail-market.utils';

const MAILMarketTable: FC<MAILMarketTableProps> = ({ control, popular }) => {
  const query = useWatch({ control, name: 'search' });
  const { fireRerender } = useRerender();

  const localAssets = useLocalStorage('localAssets', []) as ReadonlyArray<
    Omit<IMailMarketData, 'imgUrl'>
  > | null;

  const addTokenToLocalStorage =
    (data: Omit<IMailMarketData, 'imgUrl'>) =>
    (e: ReactMouseEvent<HTMLElement, MouseEvent>): void => {
      e.stopPropagation();
      const assets = JSON.parse(localStorage.getItem('localAssets') ?? '[]');
      localStorage.setItem('localAssets', JSON.stringify([...assets, data]));

      fireRerender();
    };

  const removeTokenFromLocalStorage =
    (target: string) =>
    (e: ReactMouseEvent<HTMLElement, MouseEvent>): void => {
      e.stopPropagation();
      const newAssets = (
        JSON.parse(
          localStorage.getItem('localAssets') ?? '[]'
        ) as ReadonlyArray<Omit<IMailMarketData, 'imgUrl'>>
      ).filter(({ address }) => address !== target);
      localStorage.setItem('localAssets', JSON.stringify(newAssets));

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
      !addressMatch(address, [localAssets ?? [], MAIL_MARKET_DATA])
  );
  return (
    <Table
      headings={MAIL_MARKET_HEADINGS}
      data={(popular
        ? (!localAssets?.length
            ? mapFetchMarketData(queryFetchResult)
            : []
          ).concat(MAIL_MARKET_DATA)
        : mapFetchMarketData(queryFetchResult.concat(localAssets ?? []))
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
              {!addressMatch(address, [localAssets ?? [], MAIL_MARKET_DATA]) ? (
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
                  (ADD)
                </Typography>
              ) : (
                addressMatch(address, [localAssets ?? []]) && (
                  <Typography
                    ml="L"
                    fontSize="S"
                    variant="normal"
                    hover={{ color: 'accent' }}
                    onClick={removeTokenFromLocalStorage(address)}
                  >
                    (Remove)
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
