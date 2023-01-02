import { useTranslations } from 'next-intl';

import { Container } from '@/components';
import { Typography } from '@/elements';

import GoBack from '../../components/go-back';

const FindPoolView = () => {
  const t = useTranslations();

  return (
    <Container py="XL" dapp>
      <GoBack routeBack />
      <Typography variant="normal" width="100%">
        {t('dexPoolFind.title')}
      </Typography>
    </Container>
  );
};

export default FindPoolView;
