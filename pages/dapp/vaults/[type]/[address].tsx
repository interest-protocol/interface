import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { mergeDeepRight } from 'ramda';

import { VaultTypes } from '@/constants';
import DineroVault from '@/views/dapp/views/dinero-vaults';
import ErrorView from '@/views/dapp/views/error';

interface VaultTypePageProps {
  address: string | undefined | null;
  type: string | undefined | null;
}

const VaultTypePage: NextPage<VaultTypePageProps> = ({ address, type }) => {
  const t = useTranslations();
  if (!address || !type) return <ErrorView message={t('error.wrongParams')} />;

  return type === VaultTypes.DV ? (
    <DineroVault vault={address as string} />
  ) : (
    <ErrorView message={t('error.wrongParams')} />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { type, address } = params || {};
  const [commonMessages, vaultAddressMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/vault/dinero-vaults/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    vaultAddressMessages.default
  );

  return {
    props: {
      address,
      type,
      messages,
      now: new Date().getTime(),
      pageTitle: 'dineroVault.pageTitle',
    },
  };
};

export default VaultTypePage;
