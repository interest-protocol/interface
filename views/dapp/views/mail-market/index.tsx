import { compose, prop, uniqBy } from 'ramda';
import { FC, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import {
  useGetManyMailSummaryData,
  useIdAccount,
  useLocalStorage,
} from '@/hooks';
import { LocalMAILMarketData } from '@/interface';
import { flippedAppend } from '@/utils';
import { processManyMailSummaryData } from '@/utils/mail-markets';

import Loading from '../../components/loading';
import ErrorView from '../error';
import { MAILMarketTable } from './components';
import MAILMarketSearchInput from './components/mail-market-search-bar';
import { AddLocalAsset } from './mail-market.types';

const MAILMarket: FC = () => {
  const { chainId } = useIdAccount();
  const { register, control } = useForm({ defaultValues: { search: '' } });

  const [localAssets, setLocalAssets] = useLocalStorage<
    ReadonlyArray<LocalMAILMarketData>
  >(`${chainId}-interest-protocol-mail-markets`, []);

  const { data, error } = useGetManyMailSummaryData(
    localAssets.map(prop('token'))
  );

  const addLocalAsset = useCallback(
    compose(
      setLocalAssets,
      uniqBy(prop('token')),
      flippedAppend(localAssets)
    ) as AddLocalAsset,
    [localAssets]
  );

  const { recommendedMarkets, localMarkets } = useMemo(
    () => processManyMailSummaryData(data, localAssets, chainId),
    [data, localAssets, chainId]
  );

  if (error) return <ErrorView message="Error fetching data" />;

  if (!data) return <Loading />;

  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        <Container dapp px="M" background="specialBackground" width="100%">
          <Box mt="XL" display="flex" justifyContent="space-between">
            <Typography variant="normal" ml="M">
              Multi-asset Isolated Lending Markets
            </Typography>
            {!!recommendedMarkets.length && localMarkets.length > 6 && (
              <Typography
                color="accent"
                variant="normal"
                hover={{
                  color: 'accentActive',
                }}
              >
                <a href="#recommended">See recommended</a>
              </Typography>
            )}
          </Box>
          <MAILMarketSearchInput
            chainId={chainId}
            control={control}
            register={register}
            addLocalAsset={addLocalAsset}
            allMarkets={recommendedMarkets.concat(localMarkets)}
          />
          <MAILMarketTable
            favorite
            control={control}
            data={localMarkets}
            localAssets={localAssets}
            setLocalAssets={setLocalAssets}
          />
          <MAILMarketTable
            control={control}
            localAssets={localAssets}
            setLocalAssets={setLocalAssets}
            data={recommendedMarkets}
          />
        </Container>
      </Box>
    </>
  );
};

export default MAILMarket;
