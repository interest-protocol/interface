import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { useLocale } from '@/hooks';
import { AddressZero } from '@/sdk';
import { UnknownCoinSVG } from '@/svg';
import { formatMoney } from '@/utils';

import GoBack from '../components/go-back';
import { LiquidityDetailsCard } from './components';
import { DEXPoolDetailsViewProps } from './dex-pool-details.types';

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = () => {
  const t = useTranslations();

  const { currentLocale } = useLocale();

  const DefaultIcon = UnknownCoinSVG;

  const FirstIcon = DefaultIcon;

  const SecondIcon = DefaultIcon;

  return (
    <Container width={['100%', '100%', '100%', 'auto']}>
      <Box mt="XL" p="L" borderRadius="L" minWidth={['20rem', '40rem']}>
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
        <Box mt="XL" color="text" display="grid" gridGap="1rem" width="100%">
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
        </Box>
      </Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
