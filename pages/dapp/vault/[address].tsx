import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import DineroVaultDetails from '@/views/dapp/views/dinero-vault-details';
import ErrorView from '@/views/dapp/views/error';

interface VaultDetailsPageProps {
  address: string | undefined | null;
}

const VaultDetailsPage: NextPage<VaultDetailsPageProps> = ({ address }) => {
  const t = useTranslations();
  if (!address) return <ErrorView message={t('error.wrongParams')} />;

  return <DineroVaultDetails vault={address as string} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { address } = params || {};
  const [commonMessages, vaultAddressMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/vault/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    vaultAddressMessages.default
  );

  return {
    props: {
      address,
      messages,
      now: new Date().getTime(),
      pageTitle: 'vaultAddress.pageTitle',
    },
  };
};

export default VaultDetailsPage;
