import { GetServerSideProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import EarnFarm from '@/views/dapp/views/earn-farm';

interface EarnFarmPageProps {
  tokenAddress: string | undefined | null;
}

const EarnFarmPage: NextPage<EarnFarmPageProps> = ({ tokenAddress }) => {
  if (!tokenAddress) return null;

  return <EarnFarm address={tokenAddress} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
  ...otherProps
}) => {
  const { tokenAddress } = params || {};
  const [commonMessages, earnMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/earn/token-address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(commonMessages.default, earnMessages.default);

  return {
    props: {
      ...otherProps,
      tokenAddress,
      messages,
      now: new Date().getTime(),
    },
  };
};

export default EarnFarmPage;
