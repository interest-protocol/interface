import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import useLocalStorage from '@/hooks/use-storage';

import { Faucet } from '../../components';
import { MAILMarketTable } from './components';
import MAILMarketSearchInput from './components/mail-market-search-bar';
import { MAIL_MARKET_DATA } from './mail-market.data';
import { IMailMarketData } from './mail-market.types';
import { addressMatch } from './mail-market.utils';

const MAILMarket: FC = () => {
  const { push } = useRouter();
  const { register, control } = useForm({ defaultValues: { search: '' } });

  const [localAssets, setLocalAssets] = useLocalStorage<
    ReadonlyArray<Omit<IMailMarketData, 'Icon' | 'currenciesCost'>>
  >('localAssets', []);

  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        <Container dapp px="M" background="specialBackground" width="100%">
          <Box mt="XL" display="flex" justifyContent="space-between">
            <Typography variant="normal" ml="M">
              Multi-asset Isolated Lending Markets
            </Typography>
            {!!localAssets?.length && (
              <a href="#popular">
                <Typography
                  color="accent"
                  variant="normal"
                  display={['block', 'block', 'block', 'none']}
                  hover={{
                    color: 'accentActive',
                  }}
                >
                  See Popular
                </Typography>
              </a>
            )}
          </Box>
          <MAILMarketSearchInput
            register={register}
            control={control}
            localAssets={localAssets}
            setLocalAssets={setLocalAssets}
          />
          {!!localAssets?.length && (
            <Box display="grid" columnGap="1rem">
              <Box id="favorites" mt="XL">
                Favorites
              </Box>
              <MAILMarketTable
                control={control}
                localAssets={localAssets}
                setLocalAssets={setLocalAssets}
                favorite
              />
            </Box>
          )}
          {!!MAIL_MARKET_DATA.filter(
            ({ address }) => !addressMatch(address, [localAssets])
          )?.length && (
            <Box display="grid" columnGap="1rem">
              <Box id="recommended" mt="XL">
                Recommended
              </Box>
              <MAILMarketTable
                control={control}
                localAssets={localAssets}
                setLocalAssets={setLocalAssets}
              />
            </Box>
          )}
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
