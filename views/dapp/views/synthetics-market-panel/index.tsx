import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Container, Tooltip } from '@/components';
import { RoutesEnum } from '@/constants';
import { Box } from '@/elements';
import { useIdAccount } from '@/hooks/use-id-account';
import { FixedPointMath } from '@/sdk';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import MyOpenPosition from './components/my-open-position';
import RewardsData from './components/rewards-data';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { syntheticsFormValidation } from './synthetics-form.validator';
import { SYNT_FORM_DEFAULT_VALUES } from './synthetics-market.data';
import { useGetSyntheticUserMarketData } from './synthetics-market.hooks';
import {
  ISyntheticForm,
  SyntheticsMarketPanelProps,
} from './synthetics-market.types';
import {
  getMyPositionData,
  getRewardsInfo,
  processSyntheticData,
} from './synthetics-market.utils';
import SyntheticsMarketForm from './synthetics-market-form';
import SyntheticsMarketSwitch from './synthetics-market-switch';

const SyntheticsMarketPanel: FC<SyntheticsMarketPanelProps> = ({
  address,
  mode,
}) => {
  const { chainId, account } = useIdAccount();

  const { error, data, refetch } = useGetSyntheticUserMarketData(
    address,
    chainId,
    account
  );

  const market = useMemo(
    () => processSyntheticData(chainId, account, address, data),
    [chainId, address, data, account]
  );

  const form = useForm<ISyntheticForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: SYNT_FORM_DEFAULT_VALUES,
    resolver: yupResolver(syntheticsFormValidation),
  });

  const rewardsInfo = getRewardsInfo(market);
  const myPositionData = getMyPositionData(market);

  if (error) return <ErrorPage message="Something went wrong" />;

  return (
    <Container
      dapp
      my="XL"
      width="100%"
      display="flex"
      position="relative"
      flexDirection="column"
    >
      <Box
        textAlign={['center', 'center', 'center', 'left']}
        left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
        position={['static', 'static', 'absolute', 'static', 'absolute']}
      >
        <GoBack route={RoutesEnum.SyntheticsMarket} />
      </Box>
      <Box>
        <Box bg="foreground" textAlign="center" p="L" borderRadius="L">
          <SyntheticsMarketSwitch
            mode={mode}
            address={address}
            resetField={form.resetField}
          />
        </Box>
        <Box
          my="L"
          rowGap="0.7rem"
          columnGap="0.7rem"
          gridTemplateColumns="1fr 1fr"
          display={['flex', 'flex', 'flex', 'grid']}
          alignItems={['stretch', 'stretch', 'stretch', 'start']}
          flexDirection={['column', 'column', 'column', 'unset']}
          gridTemplateAreas="'a b''a b''a c''a d''a d''a d''e d''e d''e d''f d'"
        >
          <SyntheticsMarketForm
            mode={mode}
            form={form}
            data={market}
            isGettingData={market.loading}
            refetch={async () => {
              await refetch();
            }}
          />
          <UserLTV
            isLoading={market.loading}
            ltv={FixedPointMath.toNumber(market.ltv)}
          />
          <RewardsData info={rewardsInfo} isLoading={market.loading} />
          <MyOpenPosition
            symbol={market.syntSymbol}
            isLoading={market.loading}
            myPositionData={myPositionData}
            syntUSDPrice={market.syntUSDPrice}
          />
          <YourBalance data={market} />
        </Box>
      </Box>
      <Tooltip />
    </Container>
  );
};

export default SyntheticsMarketPanel;