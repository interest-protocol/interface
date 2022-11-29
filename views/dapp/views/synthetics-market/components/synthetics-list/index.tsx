import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { v4 } from 'uuid';

import colors from '@/design-system/landing-page-theme/colors';
import { Box } from '@/elements';
import { LoadingSVG } from '@/svg';
import { getLPToastOption } from '@/views/home/layout/layout.utils';

import { handleFilterDineroMarkets } from '../../synthetics-market.utils';
import { SyntheticsListProps } from './synthetics-list.types';
import SyntheticsListCard from './synthetics-list-card';

const SyntheticsList: FC<SyntheticsListProps> = ({
  control,
  markets,
  chainId,
  loading,
}) => {
  const sortBy = useWatch({ control, name: 'sortBy' });
  const search = useWatch({ control, name: 'search' });
  const onlyMinted = useWatch({ control, name: 'onlyMinted' });

  const filteredMarkets = handleFilterDineroMarkets(
    markets,
    sortBy,
    search,
    onlyMinted
  );

  return (
    <>
      <Box
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr 1fr']}
      >
        {loading ? (
          <Box mx="auto" mt="XL" width="4rem" gridColumn="1 / span 3">
            <LoadingSVG width="100%" maxHeight="" maxWidth="" />
          </Box>
        ) : (
          filteredMarkets.map((x) => (
            <SyntheticsListCard key={v4()} chainId={chainId} data={x} />
          ))
        )}
      </Box>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={getLPToastOption(colors)}
      />
    </>
  );
};

export default SyntheticsList;
