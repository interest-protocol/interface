import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
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
  locale = LocalesEnum.EN,
  params,
}: {
  params: EarnFarmPageProps;
  locale: LocalesEnum;
}) => {
  const { tokenAddress } = params;

  return {
    props: {
      tokenAddress,
      messages: {
        ...require(`../../../assets/messages/earn/token-address/${
          LOCALES[locale] || LOCALES[LocalesEnum.EN]
        }.json`),
        ...require(`../../../assets/messages/common/${
          LOCALES[locale] || LOCALES[LocalesEnum.EN]
        }.json`),
      },
    },
  };
};

export default EarnFarmPage;
