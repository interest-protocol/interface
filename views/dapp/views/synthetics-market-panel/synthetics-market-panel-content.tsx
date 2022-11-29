import { FC } from 'react';

import { Container, Tooltip } from '@/components';
import { RoutesEnum } from '@/constants';
import Box from '@/elements/box';

import GoBack from '../../components/go-back';
import GetRewards from './components/buttons/get-rewards';
import MyOpenPosition from './components/my-open-position';
import RewardsData from './components/rewards-data';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import SyntheticsMarketForm from './synthetics-market-form';
import { SyntheticsMarketPanelContentProps } from './synthetics-market-panel.types';
import { calculatePositionHealth } from './synthetics-market-panel.utils';
import SyntheticsMarketSwitch from './synthetics-market-switch';

const SyntheticsMarketPanelContent: FC<SyntheticsMarketPanelContentProps> = ({
  mode,
  form,
  market,
  refetch,
  address,
  burnButton,
  mintButton,
  rewardsInfo,
  myPositionData,
}) => (
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
        gridGap="0.7rem"
        gridTemplateColumns="1fr 1fr"
        display={['flex', 'flex', 'flex', 'grid']}
        alignItems={['stretch', 'stretch', 'stretch', 'start']}
        flexDirection={['column', 'column', 'column', 'unset']}
        gridTemplateAreas="'a b''a b''a c''a d''a d''a d''a d''e d''e d''e g''e 0'"
      >
        <SyntheticsMarketForm
          mode={mode}
          burnButton={burnButton}
          mintButton={mintButton}
          form={form}
          data={market}
          refetch={refetch}
          isGettingData={market.loading}
        />
        <UserLTV
          ltv={calculatePositionHealth(market, market.userSyntMinted).toNumber(
            16,
            0,
            4
          )}
        />
        <RewardsData info={rewardsInfo} isLoading={market.loading} />
        <MyOpenPosition
          collateralSymbol={market.collateralSymbol}
          syntSymbol={market.syntSymbol}
          isStable={market.isCollateralStable}
          syntPrice={market.syntPrice}
          isLoading={market.loading}
          myPositionData={myPositionData}
        />
        <YourBalance data={market} />
        <GetRewards market={market} refetch={refetch} />
      </Box>
    </Box>
    <Tooltip />
  </Container>
);

export default SyntheticsMarketPanelContent;
