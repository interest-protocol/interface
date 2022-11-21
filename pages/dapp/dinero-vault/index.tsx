import { GetStaticProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { useRouterQuery } from '@/hooks';
import DineroVault from '@/views/dapp/views/dinero-vault';
import ErrorView from '@/views/dapp/views/error';

const DineroVaultPage: NextPage = () => {
  const t = useTranslations();

  const address = String(useRouterQuery('address'));

  if (!address) return <ErrorView message={t('error.wrongParams')} />;

  return <DineroVault vault={address as string} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroVaultMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-vault/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroVaultMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroVault.pageTitle',
    },
  };
};

export default DineroVaultPage;
