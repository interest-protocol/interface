import { useRouter } from 'next/router';
import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Table, Typography } from '@/elements';
import useLocalStorage from '@/hooks/use-storage';
import { StarSVG } from '@/svg';

import { MAIL_MARKET_DATA, MAIL_MARKET_HEADINGS } from '../../mail-market.data';
import {
  IMailMarketData,
  MAILMarketTableProps,
  TMailMarketData,
} from '../../mail-market.types';
import { addressMatch } from '../../mail-market.utils';

const MAILMarketTable: FC<MAILMarketTableProps> = ({ control }) => {
  const { push } = useRouter();
  const query = useWatch({ control, name: 'search' });

  const [localAssets] = useLocalStorage<
    ReadonlyArray<Omit<IMailMarketData, 'imgUrl'>>
  >('localAssets', []);

  const addTokenToLocalStorage =
    (data: Omit<IMailMarketData, 'Icon'>) =>
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

  const data = MAIL_MARKET_DATA.map((dataItem) => ({
    ...dataItem,
    currenciesCost: [
      [
        `${Math.round(Math.random() * 100)}%`,
        `${Math.round(Math.random() * 100)}%`,
      ],
      [
        `${Math.round(Math.random() * 100)}%`,
        `${Math.round(Math.random() * 100)}%`,
      ],
      [
        `${Math.round(Math.random() * 100)}%`,
        `${Math.round(Math.random() * 100)}%`,
      ],
      [
        `${Math.round(Math.random() * 100)}%`,
        `${Math.round(Math.random() * 100)}%`,
      ],
    ],
  })) as TMailMarketData;

  return (
    <>
      {data
        .filter(({ symbol }) =>
          [symbol].some((item) =>
            item.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
        )
        .map(({ Icon, symbol, address, name, currenciesCost }) => (
          <Table
            hasButton
            key={v4()}
            specialRowHover
            headings={MAIL_MARKET_HEADINGS}
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
                      <Icon width="1.5rem" />
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
                    gridTemplateColumns={[
                      '50% 50%',
                      '50% 50%',
                      '50% 50%',
                      '1fr',
                    ]}
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
