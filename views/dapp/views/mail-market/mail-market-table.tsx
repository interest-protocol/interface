import { useRouter } from 'next/router';
import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Table, Typography } from '@/elements';
import useLocalStorage from '@/hooks/use-storage';
import { StarSVG } from '@/svg';

import { MAIL_MARKET_DATA, MAIL_MARKET_HEADINGS } from './mail-market.data';
import { IMailMarketData, MAILMarketTableProps } from './mail-market.types';
import { addressMatch } from './mail-market.utils';

const MAILMarketTable: FC<MAILMarketTableProps> = ({ control }) => {
  const { push } = useRouter();
  const query = useWatch({ control, name: 'search' });

  const [localAssets] = useLocalStorage<
    ReadonlyArray<Omit<IMailMarketData, 'imgUrl'>>
  >('localAssets', []);

  const addTokenToLocalStorage =
    (data: Omit<IMailMarketData, 'imgUrl'>) =>
    (e: ReactMouseEvent<HTMLElement, MouseEvent>): void => {
      e.stopPropagation();
      const assets = JSON.parse(localStorage.getItem('localAssets') ?? '[]');
      localStorage.setItem('localAssets', JSON.stringify([...assets, data]));
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
    };

  // const queryFetchResult = [
  //   {
  //     symbol: 'INT',
  //     name: 'Interest Protocol',
  //     address: '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2',
  //   },
  // ].filter(
  //   ({ address }) =>
  //     !addressMatch(address, [localAssets ?? [], MAIL_MARKET_DATA])
  // );

  return (
    <>
      {MAIL_MARKET_DATA.filter(({ symbol }) =>
        [symbol].some((item) =>
          item.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      ).map(({ imgUrl, symbol, address, name, currenciesCost }) => (
        <Table
          hasButton
          key={v4()}
          specialRowHover
          headings={MAIL_MARKET_HEADINGS}
          // data={(popular
          //   ? (!localAssets?.length
          //       ? mapFetchMarketData(queryFetchResult)
          //       : []
          //     ).concat(MAIL_MARKET_DATA)
          //   : mapFetchMarketData(queryFetchResult.concat(localAssets ?? []))
          // )
          data={[
            {
              button: (
                <Box display="flex" justifyContent="flex-end">
                  <Box
                    width="1.2rem"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <StarSVG filled />
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
                    <img
                      width="100%"
                      alt="uniswap"
                      loading="lazy"
                      src={imgUrl}
                    />
                  </Box>
                  <Typography variant="normal" fontWeight="500">
                    {symbol}
                  </Typography>
                  {!addressMatch(address, [
                    localAssets ?? [],
                    MAIL_MARKET_DATA,
                  ]) ? (
                    <Typography
                      ml="L"
                      fontSize="S"
                      variant="normal"
                      hover={{ color: 'accent' }}
                      onClick={addTokenToLocalStorage({
                        name,
                        symbol,
                        address,
                        currenciesCost: [],
                      })}
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
                        onClick={removeTokenFromLocalStorage(address)}
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
                  <Typography variant="normal">Borrow</Typography>
                  <Typography variant="normal">Supply</Typography>
                </Box>,
                ...currenciesCost.map(([borrow, supply]) => (
                  <Box
                    key={v4()}
                    gridGap="L"
                    display="grid"
                    gridTemplateColumns={[
                      '50% 50%',
                      '50% 50%',
                      '50% 50%',
                      '1fr',
                    ]}
                  >
                    <Typography variant="normal">{borrow}</Typography>
                    <Typography variant="normal">{supply}</Typography>
                  </Box>
                )),
              ],
            },
          ]}
        />
      ))}
    </>
  );
};

export default MAILMarketTable;
