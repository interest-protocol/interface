import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';
import { capitalize } from '@/utils';

import { ApproveButtonProps } from './remove-liquidity-card.types';

const ApproveButton: FC<ApproveButtonProps> = ({
  onClick,
  symbol0,
  symbol1,
  control,
  disabled,
}) => {
  const t = useTranslations();
  const loading = useWatch({ control, name: 'loading' });

  return (
    <Button
      bg={loading || disabled ? 'disabled' : 'accent'}
      width="100%"
      variant="primary"
      hover={{ bg: loading || disabled ? 'disabled' : 'accentActive' }}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {capitalize(
        t('common.approve', {
          isLoading: Number(loading),
        })
      )}{' '}
      {symbol0}/{symbol1} LP
    </Button>
  );
};

export default ApproveButton;
