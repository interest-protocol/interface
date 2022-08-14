import { prop } from 'ramda';
import { FC } from 'react';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import {
  useGetManyMailSummaryData,
  useIdAccount,
  useLocalStorage,
} from '@/hooks';
import { LocalMAILMarketData } from '@/interface';

const MAILMarket: FC = () => {
  const { chainId } = useIdAccount();

  const [localAssets, setLocalAssets] = useLocalStorage<
    ReadonlyArray<LocalMAILMarketData>
  >(`${chainId}-interest-protocol-mail-markets`, []);

  const { data, error } = useGetManyMailSummaryData(
    localAssets.map(prop('token'))
  );

  console.log(data);
  console.log(error);
  console.log(setLocalAssets);

  return (
    <>
      <Box flex="1" display="flex" flexDirection="column">
        <Container dapp px="M" background="specialBackground" width="100%">
          <Box mt="XL" display="flex" justifyContent="space-between">
            <Typography variant="normal" ml="M">
              Multi-asset Isolated Lending Markets
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MAILMarket;
