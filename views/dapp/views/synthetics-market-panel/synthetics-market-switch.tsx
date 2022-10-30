import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FieldPath } from 'react-hook-form';

import { Switch } from '@/components';
import { ISwitchOption } from '@/components/switch/switch.types';
import { Routes, RoutesEnum } from '@/constants/routes';

import { SYNT_FORM_DEFAULT_VALUES } from './synthetics-market.data';
import { SyntheticsMarketSwitchProps } from './synthetics-market.types';

const FORM_FIELDS = [
  'mint.collateral',
  'mint.synt',
  'burn.collateral',
  'burn.synt',
] as ReadonlyArray<FieldPath<typeof SYNT_FORM_DEFAULT_VALUES>>;

const SyntheticsMarketSwitch: FC<SyntheticsMarketSwitchProps> = ({
  mode,
  address,
  resetField,
}) => {
  const { push } = useRouter();
  const t = useTranslations();
  const switchTo = (targetMode: 'mint' | 'burn') => () => {
    FORM_FIELDS.forEach((name) => resetField(name));
    push(
      {
        pathname:
          Routes[
            targetMode === 'mint'
              ? RoutesEnum.SyntheticsMarketMint
              : RoutesEnum.SyntheticsMarketBurn
          ],
        query: { address },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const options: [ISwitchOption, ISwitchOption] = [
    {
      value: 'mint',
      onSelect: switchTo('mint'),
      displayValue: t('syntheticsMarketAddress.mint.title'),
    },
    {
      value: 'burn',
      onSelect: switchTo('burn'),
      displayValue: t('syntheticsMarketAddress.burn.title'),
    },
  ];

  return <Switch defaultValue={mode} options={options} />;
};

export default SyntheticsMarketSwitch;
