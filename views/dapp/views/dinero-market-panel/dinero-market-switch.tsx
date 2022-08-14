import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { FieldPath } from 'react-hook-form';

import { Switch } from '@/components';
import { ISwitchOption } from '@/components/switch/switch.types';
import { Routes, RoutesEnum } from '@/constants/routes';

import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketSwitchProps } from './dinero-market.types';

const FORM_FIELDS = [
  'borrow.loan',
  'borrow.collateral',
  'repay.loan',
  'repay.collateral',
] as ReadonlyArray<FieldPath<typeof BORROW_DEFAULT_VALUES>>;

const DineroMarketSwitch: FC<DineroMarketSwitchProps> = ({
  mode,
  address,
  resetField,
}) => {
  const { push } = useRouter();
  const switchTo = (targetMode: 'borrow' | 'repay') => () => {
    FORM_FIELDS.forEach((name) => resetField(name));
    push(
      {
        pathname:
          Routes[
            targetMode === 'borrow'
              ? RoutesEnum.DineroMarketBorrow
              : RoutesEnum.DineroMarketRepay
          ],
        query: { address },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const options: [ISwitchOption, ISwitchOption] = useMemo(
    () => [
      {
        value: 'borrow',
        onSelect: switchTo('borrow'),
      },
      {
        value: 'repay',
        onSelect: switchTo('repay'),
      },
    ],
    [mode]
  );

  return <Switch defaultValue={mode} options={options} />;
};

export default DineroMarketSwitch;
