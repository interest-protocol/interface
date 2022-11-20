import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { getQueryFromPath } from '@/utils';
import DineroVault from '@/views/dapp/views/dinero-vault';
import ErrorView from '@/views/dapp/views/error';

const DineroVaultPage: NextPage = () => {
  const t = useTranslations();

  const { asPath } = useRouter();

  const address = String(getQueryFromPath(asPath).address);

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
