import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Container } from '@/components';
import { Typography } from '@/elements';
import { useLocale } from '@/hooks';

import { DineroVaultHeaderProps } from '../../vault.types';

const DineroVaultHeader: FC<DineroVaultHeaderProps> = ({ size }) => {
  const { currentLocale } = useLocale();
  const t = useTranslations();
  return (
    <Container
      dapp
      py="XL"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent={['center', 'center', 'center', 'flex-start']}
    >
      <Typography variant="normal" fontWeight="bold">
        {t('dineroVault.title', {
          currentLocale,
          count: size,
        })}
      </Typography>
    </Container>
  );
};

export default DineroVaultHeader;
