import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { isSameAddress } from '@/utils';

import { MAILMarketTableProps } from '../../mail-market.types';
import MAILMarketTableItem from './mail-market-table-item';

const MAILMarketTable: FC<MAILMarketTableProps> = ({
  data,
  control,
  favorite,
  localAssets,
  setLocalAssets,
}) => {
  const t = useTranslations('common');
  const query = useWatch({ control, name: 'search' });

  const filteredData = useMemo(
    () =>
      data.filter(({ symbol, market, name, token }) =>
        ethers.utils.isAddress(query)
          ? isSameAddress(query, market) || isSameAddress(query, token)
          : symbol.toLowerCase().startsWith(query.trim().toLowerCase()) ||
            name.toLowerCase().startsWith(query.trim().toLowerCase()) ||
            symbol.toLowerCase().includes(query.trim().toLowerCase()) ||
            name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [data, query]
  );

  return filteredData.length ? (
    <Box display="grid" columnGap="1rem">
      <Box id={favorite ? 'favorites' : 'recommended'} mt="XL">
        <Typography variant="normal" textTransform="capitalize">
          {favorite ? t('favorites') : t('recommended')}
        </Typography>
      </Box>
      {filteredData.map((item) => (
        <MAILMarketTableItem
          key={v4()}
          data={item}
          localAssets={localAssets}
          setLocalAssets={setLocalAssets}
        />
      ))}
    </Box>
  ) : null;
};

export default MAILMarketTable;
