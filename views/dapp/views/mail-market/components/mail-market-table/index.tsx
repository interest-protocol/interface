import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { MAIL_MARKET_DATA } from '../../mail-market.data';
import { MAILMarketTableProps, TMailMarketData } from '../../mail-market.types';
import { addressMatch } from '../../mail-market.utils';
import MAILMarketTableItem from './mail-market-table-item';

const MAILMarketTable: FC<MAILMarketTableProps> = ({
  control,
  localAssets,
  setLocalAssets,
  favorite,
}) => {
  const query = useWatch({ control, name: 'search' });

  const data = useMemo(
    () =>
      (favorite
        ? localAssets.map(({ address, ...rest }) => ({
            ...rest,
            address,
            Icon:
              MAIL_MARKET_DATA.find((item) => item.address == address)?.Icon ??
              undefined,
          }))
        : MAIL_MARKET_DATA.filter(
            ({ address }) => !addressMatch(address, [localAssets])
          )
      ).map((dataItem) => ({
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
          [
            `${Math.round(Math.random() * 100)}%`,
            `${Math.round(Math.random() * 100)}%`,
          ],
        ],
      })) as TMailMarketData,
    [localAssets]
  );

  return (
    <>
      {data
        .filter(({ symbol }) =>
          [symbol].some((item) =>
            item.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
        )
        .map((item) => (
          <MAILMarketTableItem
            {...item}
            key={v4()}
            data={data}
            localAssets={localAssets}
            setLocalAssets={setLocalAssets}
          />
        ))}
    </>
  );
};

export default MAILMarketTable;
