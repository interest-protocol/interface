import { ethers } from 'ethers';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { isSameAddress } from '@/utils';

import { MAILMarketTableProps } from '../../mail-market.types';
import MAILMarketTableItem from './mail-market-table-item';

const MAILMarketTable: FC<MAILMarketTableProps> = ({
  data,
  control,
  localAssets,
  setLocalAssets,
}) => {
  const query = useWatch({ control, name: 'search' });

  return (
    <>
      {data
        .filter(({ symbol, market, name }) =>
          ethers.utils.isAddress(query)
            ? isSameAddress(query, market)
            : symbol.toLowerCase().startsWith(query.toLowerCase()) ||
              name.toLowerCase().startsWith(query.toLowerCase())
        )
        .map((item) => (
          <MAILMarketTableItem
            key={v4()}
            data={item}
            localAssets={localAssets}
            setLocalAssets={setLocalAssets}
          />
        ))}
    </>
  );
};

export default MAILMarketTable;
