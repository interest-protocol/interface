import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box } from '@/elements';
import { capitalize } from '@/utils';

import SwapSelectCurrency from '../dex/components/swap-select-currency';
import { FindPoolProps } from './dex-find-pool.types';

const FindPool: FC<FindPoolProps> = ({
  control,
  setValue,
  currencyAChargerArgs,
  currencyBChargerArgs,
}) => {
  const t = useTranslations();
  const addressA = useWatch({ control, name: `tokenA.address` });
  const addressB = useWatch({ control, name: `tokenB.address` });
  const isStable = useWatch({ control, name: `isStable` });

  return (
    <Box
      my="L"
      px="L"
      py="XL"
      color="text"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
      width={['100%', '30rem']}
    >
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        flexWrap={['wrap', 'nowrap']}
        justifyContent={['center', 'space-between']}
      >
        <SwapSelectCurrency currentToken={addressA} {...currencyAChargerArgs} />
        <Box mt={['L', 'NONE']} order={[1, 0]} width="100%" textAlign="center">
          <Switch
            thin
            defaultValue={isStable ? 'stable' : 'volatile'}
            options={[
              {
                value: 'stable',
                displayValue: capitalize(t('common.stable', { count: 2 })),
                onSelect: () => setValue('isStable', true),
              },
              {
                value: 'volatile',
                displayValue: capitalize(t('common.volatile', { count: 1 })),
                onSelect: () => setValue('isStable', false),
              },
            ]}
          />
        </Box>
        <SwapSelectCurrency currentToken={addressB} {...currencyBChargerArgs} />
      </Box>
    </Box>
  );
};

export default FindPool;
