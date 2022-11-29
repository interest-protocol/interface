import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

import { withAddressGuard } from '@/HOC';
import { NextPageWithAddress } from '@/interface';

const DynamicDineroVault = dynamic(
  () => import('../../../views/dapp/views/dinero-vault')
);

const DineroVaultPage: NextPageWithAddress = ({ address }) => (
  <DynamicDineroVault vault={address} />
);

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
      now: Date.now(),
      pageTitle: 'dineroVault.pageTitle',
    },
  };
};

export default withAddressGuard(DineroVaultPage);
