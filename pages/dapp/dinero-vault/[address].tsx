import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { GAAction } from '@/constants/google-analytics';
import { logException } from '@/utils/analytics';
import DineroVault from '@/views/dapp/views/dinero-vault';
import ErrorView from '@/views/dapp/views/error';

interface DineroVaultPageProps {
  address: string | undefined | null;
}

const DineroVaultPage: NextPage<DineroVaultPageProps> = ({ address }) => {
  const t = useTranslations();
  if (!address) {
    logException({
      action: GAAction.ErrorPage,
      label: `Error Page: Wrong params`,
      trackerName: ['pages\\dapp\\dinero-vault\\[address].tsx'],
    });
    return <ErrorView message={t('error.wrongParams')} />;
  }

  return <DineroVault vault={address as string} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { address } = params || {};
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
      address,
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroVault.pageTitle',
    },
  };
};

export default DineroVaultPage;
