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
  currencyASelectArgs,
  currencyBSelectArgs,
  setCreatingPair,
}) => {
  const t = useTranslations();
  const isStable = useWatch({ control, name: `isStable` });
  const addressA = useWatch({ control, name: `tokenA.address` });
  const addressB = useWatch({ control, name: `tokenB.address` });

  return (
    <Box
      my="L"
      px="L"
      py="XL"
      color="text"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
      width={['100%', '100%', '100%', '30rem']}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexWrap={['wrap', 'wrap', 'wrap', 'nowrap']}
        justifyContent={['center', 'center', 'center', 'space-between']}
      >
        <SwapSelectCurrency currentToken={addressA} {...currencyASelectArgs} />
        <Box
          width="100%"
          textAlign="center"
          order={[1, 1, 1, 0]}
          mt={['L', 'L', 'L', 'NONE']}
        >
          <Switch
            thin
            defaultValue={isStable ? 'stable' : 'volatile'}
            options={[
              {
                value: 'stable',
                displayValue: capitalize(t('common.stable', { count: 1 })),
                onSelect: () => {
                  setValue('isStable', true);
                  setCreatingPair(false);
                },
              },
              {
                value: 'volatile',
                displayValue: capitalize(t('common.volatile', { count: 1 })),
                onSelect: () => {
                  setValue('isStable', false);
                  setCreatingPair(false);
                },
              },
            ]}
          />
        </Box>
        <SwapSelectCurrency currentToken={addressB} {...currencyBSelectArgs} />
      </Box>
    </Box>
  );
};

export default FindPool;
