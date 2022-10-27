import { useTranslations } from 'next-intl';
import { FC } from 'react';

import Box from '@/elements/box';
import Button from '@/elements/button';

const WithdrawRewards: FC = () => {
  const t = useTranslations();

  return (
    <Box p="XL" order={4} gridArea="g" bg="foreground" borderRadius="L">
      <Button variant="primary" width="100%">
        {t('syntheticsMarketAddress.button.withdrawRewards')}
      </Button>
    </Box>
  );
};

export default WithdrawRewards;
