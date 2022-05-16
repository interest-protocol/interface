import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import useRerender from '@/hooks/use-rerender';
import useLocalStorage from '@/hooks/use-storage';
import { ProgressSVG } from '@/svg';
import { formatDollars } from '@/utils';

import Web3Manager from '../../web3-manager';
import { IMailMarketData, MAILMarketPoolProps } from './mail-market-pool.types';
import MAILMarketSearchInput from './mail-market-pool-search-input';
import MAILMarketTable from './mail-market-pool-table';

const MAILMarketPool: FC<MAILMarketPoolProps> = ({ pool }) => {
  const { rerender } = useRerender();
  const { register, control } = useForm({ defaultValues: { search: '' } });

  const localCoin = useLocalStorage('localCoin', [rerender]) as ReadonlyArray<
    Omit<IMailMarketData, 'imgUrl'>
  >;

  return (
    <Web3Manager>
      <Box flex="1" display="flex" flexDirection="column">
        <Container
          dapp
          px="NONE"
          background="specialBackground"
          width={['100%', '100%', '100%', localCoin?.length ? '100%' : '50%']}
        >
          <Box mt="XL" display="flex" justifyContent="space-between">
            <Typography variant="normal" ml="M">
              {pool} Pool
            </Typography>
            {!!localCoin?.length && (
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
          <Box
            p="XL"
            mt="XL"
            display="grid"
            bg="foreground"
            columnGap="2rem"
            borderRadius="L"
            gridTemplateColumns="1fr 1fr"
          >
            <Box>
              <Box display="flex" justifyContent="space-between" my="M">
                <Typography variant="normal">Supply Cost</Typography>
                <Typography variant="normal" fontWeight="500">
                  {formatDollars(9999)} - 70%
                </Typography>
              </Box>
              <Box>
                <ProgressSVG progress={70} />
              </Box>
            </Box>
            <Box>
              <Box display="flex" justifyContent="space-between" my="M">
                <Typography variant="normal">Borrow Cost</Typography>
                <Typography variant="normal" fontWeight="500">
                  {formatDollars(9999)} - 70%
                </Typography>
              </Box>
              <Box>
                <ProgressSVG progress={70} />
              </Box>
            </Box>
          </Box>
          <MAILMarketSearchInput register={register} />
          <Box
            display="grid"
            columnGap="1rem"
            {...(!!localCoin?.length && {
              gridTemplateColumns: ['1fr', '1fr', '1fr', '1fr 1fr'],
            })}
          >
            <MAILMarketTable control={control} popular />
          </Box>
        </Container>
      </Box>
    </Web3Manager>
  );
};

export default MAILMarketPool;
