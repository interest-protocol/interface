import { NextPage } from 'next';

import EarnFarm from '@/views/dapp/views/earn-farm';

interface EarnFarmPageProps {
  tokenAddress: string;
}

const EarnFarmPage: NextPage<EarnFarmPageProps> = ({ tokenAddress }) => {
  if (!tokenAddress) return null;

  return <EarnFarm address={tokenAddress as string} />;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  locale,
  params,
}: {
  params: EarnFarmPageProps;
  locale: string;
}) => {
  const { tokenAddress } = params;

  return {
    props: {
      tokenAddress,
      messages: {
        ...require(`../../../assets/messages/earn/token-address/${locale}.json`),
        ...require(`../../../assets/messages/common/${locale}.json`),
      },
    },
  };
};

export default EarnFarmPage;
