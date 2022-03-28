import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import { Switch } from '@/components';
import { ISwitchOption } from '@/components/switch/switch.types';
import { Routes, RoutesEnum } from '@/constants/routes';

import { DineroMarketProps } from './dinero-market.types';

const DineroMarketSwitch: FC<DineroMarketProps> = ({ currency, mode }) => {
  const { push } = useRouter();
  const switchTo = (targetMode: 'borrow' | 'repay') => () =>
    push(
      `${Routes[RoutesEnum.Borrow]}?mode=${targetMode}&currency=${currency}`,
      undefined,
      {
        shallow: true,
      }
    );

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
    [currency, mode]
  );

  return <Switch defaultValue={mode} options={options} />;
};

export default DineroMarketSwitch;
