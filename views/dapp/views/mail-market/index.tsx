import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import useLocalStorage from '@/hooks/use-storage';

import Web3Manager from '../../web3-manager';
import { MAILMarketTable } from './components';
import { IMailMarketData } from './mail-market.types';
import MAILMarketSearchInput from './mail-market-search-input';

const MAILMarket: FC = () => {
  const { register, control } = useForm({ defaultValues: { search: '' } });

  const [localAssets] = useLocalStorage<
    ReadonlyArray<Omit<IMailMarketData, 'Icon'>>
  >('localAssets', []);

  return (
    <Web3Manager>
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
          <MAILMarketSearchInput register={register} />
          <Box
            display="grid"
            columnGap="1rem"
            {...(!!localAssets?.length && {
              gridTemplateColumns: ['1fr', '1fr', '1fr', '1fr 1fr'],
            })}
          >
            <Box id="recommended" mt="XL">
              Recommended
            </Box>
            <MAILMarketTable control={control} popular />
            {!!localAssets?.length && (
              <>
                <Box id="local" display={['block', 'block', 'block', 'none']}>
                  Popular
                </Box>
                <MAILMarketTable control={control} />
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Web3Manager>
  );
};

export default MAILMarket;
