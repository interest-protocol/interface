import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Box } from '@/elements';
import { useWeb3 } from '@/hooks';
import { capitalize } from '@/utils';

import SelectCurrency from '../components/select-currency';
import { FindPoolProps } from './dex-find-pool.types';

const FindPool: FC<FindPoolProps> = ({
  control,
  setValue,
  getValues,
  setCreatingPair,
  onSelectCurrency,
}) => {
  const t = useTranslations();
  const { coinsMap } = useWeb3();
  const isStable = useWatch({ control, name: `isStable` });
  const typeA = useWatch({ control, name: `tokenA.type` });
  const typeB = useWatch({ control, name: `tokenB.type` });

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
        <SelectCurrency
          tokens={coinsMap}
          currentToken={typeA}
          searchTokenModalState={null}
          type={getValues('tokenA.type')}
          symbol={getValues('tokenA.symbol')}
          onSelectCurrency={onSelectCurrency('tokenA')}
        />
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
        <SelectCurrency
          tokens={coinsMap}
          currentToken={typeB}
          searchTokenModalState={null}
          type={getValues('tokenB.type')}
          symbol={getValues('tokenB.symbol')}
          onSelectCurrency={onSelectCurrency('tokenA')}
        />
      </Box>
    </Box>
  );
};

export default FindPool;
