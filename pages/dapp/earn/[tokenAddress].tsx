import { GetServerSideProps, NextPage } from 'next';

import RedirectLang from '@/components/redirect-lang';
import EarnFarm from '@/views/dapp/views/earn-farm';

interface EarnFarmPageProps {
  tokenAddress: string | undefined | null;
}

const EarnFarmPage: NextPage<EarnFarmPageProps> = ({ tokenAddress }) => {
  if (!tokenAddress) return null;

  return (
    <>
      <RedirectLang />
      <EarnFarm address={tokenAddress} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { tokenAddress } = params || {};

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
