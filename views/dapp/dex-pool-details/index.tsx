import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { useLocale } from '@/hooks';
import { AddressZero } from '@/sdk';
import { UnknownCoinSVG } from '@/svg';
import { formatMoney } from '@/utils';

import GoBack from '../components/go-back';
import {
  AddLiquidityCard,
  LiquidityDetailsCard,
  RemoveLiquidityCard,
} from './components';
import { DEXPoolDetailsViewProps } from './dex-pool-details.types';

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({ pairAddress }) => {
  const t = useTranslations();

  const { currentLocale } = useLocale();

  const DefaultIcon = UnknownCoinSVG;

  const FirstIcon = DefaultIcon;

  const SecondIcon = DefaultIcon;

  return (
    <Container dapp mt="XXL" width="100%">
      <GoBack routeBack />
      <Box display="flex" alignItems="center">
        {
          <>
            <FirstIcon width="2rem" maxHeight="2rem" maxWidth="2rem" />
            <SecondIcon width="2rem" maxHeight="2rem" maxWidth="2rem" />
            <Typography variant="normal" ml="L" textTransform="capitalize">
              {'??? - ??? ' +
                t('dexPoolPairAddress.title', {
                  currentLocale,
                  type: t('common.stable', { count: 1 }),
                })}
            </Typography>
          </>
        }
      </Box>
      <Box
        mt="XL"
        color="text"
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        <LiquidityDetailsCard
          isStable={true}
          lines={[
            {
              address: AddressZero,
              symbol: '???',
              value: formatMoney(123),
              isFetchingInitialData: false,
            },
            {
              address: AddressZero,
              symbol: '???',
              value: formatMoney(123),
              isFetchingInitialData: false,
            },
          ]}
        />
        <AddLiquidityCard
          fetchingInitialData={false}
          isStable={true}
          tokens={[
            {
              symbol: '???',
              Icon: UnknownCoinSVG,
              decimals: 123,
              balance: 12,
              allowance: 12,
              address: AddressZero,
            },
            {
              symbol: '???',
              Icon: UnknownCoinSVG,
              decimals: 123,
              balance: 12,
              allowance: 12,
              address: AddressZero,
            },
          ]}
        />
        <RemoveLiquidityCard
          pairAddress={pairAddress}
          isFetchingInitialData={false}
          isStable={true}
          lpAllowance={12}
          lpBalance={13}
          tokens={[
            {
              symbol: '???',
              Icon: UnknownCoinSVG,
              decimals: 123,
              address: AddressZero,
            },
            {
              symbol: '???',
              Icon: UnknownCoinSVG,
              decimals: 123,
              address: AddressZero,
            },
          ]}
        />
      </Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
