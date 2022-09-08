import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/elements';

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
      {t(loading ? 'common.approveLoading' : 'common.approve')} {symbol0}/
      {symbol1} LP
    </Button>
  );
};

export default ApproveButton;
