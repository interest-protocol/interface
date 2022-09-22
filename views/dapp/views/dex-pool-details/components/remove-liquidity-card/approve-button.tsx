import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { COMMON_STRINGS } from '@/constants';
import { Button } from '@/elements';
import { capitalize } from '@/utils';

import { ApproveButtonProps } from './remove-liquidity-card.types';

const ApproveButton: FC<ApproveButtonProps> = ({
  onClick,
  symbol0,
  symbol1,
  control,
}) => {
  const t = useTranslations();
  const loading = useWatch({ control, name: 'loading' });

  return (
    <Button
      bg={loading ? 'disabled' : 'accent'}
      width="100%"
      variant="primary"
      hover={{ bg: 'accentActive' }}
      onClick={onClick}
      disabled={loading}
    >
      {capitalize(
        t('common.approve', {
          isLoading: Number(loading),
        })
      ) +
        ' ' +
        symbol0 +
        COMMON_STRINGS.per +
        symbol1 +
        ' ' +
        COMMON_STRINGS.lp}
    </Button>
  );
};

export default ApproveButton;
