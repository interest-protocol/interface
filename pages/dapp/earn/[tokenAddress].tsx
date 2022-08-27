import { NextPage } from 'next';

import EarnFarm from '@/views/dapp/views/earn-farm';
import { RedirectLang } from '@/views/home/components';

const EarnFarmPage: NextPage<{ tokenAddress: any }> = ({ tokenAddress }) => {
  if (!tokenAddress) return null;

  return (
    <>
      <RedirectLang />
      <EarnFarm address={tokenAddress as string} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = (context: {
  params: any;
  locale: string;
}) => {
  const { params } = context;
  const tokenAddress = params.tokenAddress;
  return {
    props: {
      tokenAddress: tokenAddress,
      messages: {
        ...require(`../../../assets/messages/earn/token-address/${
          context.locale == 'en-US' ? 'en' : 'pt'
        }.json`),
        ...require(`../../../assets/messages/common/${
          context.locale == 'en-US' ? 'en' : 'pt'
        }.json`),
      },
    },
  };
};

export default EarnFarmPage;
