import { useRouter } from 'next/router';
import { append, curryN, flip, o, prop } from 'ramda';
import { FC, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import { useGetManyMailSummaryData } from '@/hooks';
import useLocalStorage from '@/hooks/use-storage';
import { LocalMAILMarketData } from '@/interface';
import { getChainId } from '@/state/core/core.selectors';
import { processManyMailSummaryData } from '@/utils/mail-markets';

import { Faucet } from '../../components';
import Loading from '../../components/loading';
import ErrorView from '../error';
import { MAILMarketTable } from './components';
import MAILMarketSearchInput from './components/mail-market-search-bar';
import { AddLocalAsset } from './mail-market.types';

const flippedAppend = curryN(2, flip(append));

const MAILMarket: FC = () => {
  const { push } = useRouter();
  const { register, control } = useForm({ defaultValues: { search: '' } });
  const chainId = useSelector(getChainId) as null | number;

  const [localAssets, setLocalAssets] = useLocalStorage<
    ReadonlyArray<LocalMAILMarketData>
  >(`${chainId || ''}-interest-protocol-mail-markets`, []);

  const { data, error } = useGetManyMailSummaryData(
    localAssets.map(prop('token'))
  );

  const addLocalAsset: AddLocalAsset = useCallback(
    o(setLocalAssets, flippedAppend(localAssets)),
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
            {!!recommendedMarkets.length && (
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
      <Faucet
        customAction={() =>
          push(Routes[RoutesEnum.Faucet], undefined, {
            shallow: true,
          })
        }
      />
    </>
  );
};

export default MAILMarket;
