import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { MAIL_FAUCET_TOKENS } from '@/constants';
import { Box } from '@/elements';

import SwapSelectCurrency from '../../components/swap-select-currency';
import { AddLiquidityCurrencyChooserProps } from '../pool.types';

const AddLiquidityCurrencyChooser: FC<AddLiquidityCurrencyChooserProps> = ({
  control,
  onSelectCurrency,
}) => {
  const { pairItem1, pairItem2 } = useWatch({ control });

  return (
    <Box display="flex" justifyContent="space-between">
      <SwapSelectCurrency
        tokens={MAIL_FAUCET_TOKENS[4]}
        defaultValue={pairItem1?.address ?? ''}
        onSelectCurrency={onSelectCurrency('pairItem1')}
      />
      <SwapSelectCurrency
        fromRight
        tokens={MAIL_FAUCET_TOKENS[4]}
        defaultValue={pairItem2?.address ?? ''}
        onSelectCurrency={onSelectCurrency('pairItem2')}
      />
    </Box>
  );
};

export default AddLiquidityCurrencyChooser;
