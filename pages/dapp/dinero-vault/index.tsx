import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddress } from '@/HOC';
import DineroVault from '@/views/dapp/views/dinero-vault';

interface Props {
  address: string;
}

const DineroVaultPage: NextPage<Props> = ({ address }) => (
  <DineroVault vault={address} />
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
      now: new Date().getTime(),
      pageTitle: 'dineroVault.pageTitle',
    },
  };
};

export default withAddress(DineroVaultPage);
