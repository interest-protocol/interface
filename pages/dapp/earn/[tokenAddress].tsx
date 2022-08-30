import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import EarnFarm from '@/views/dapp/views/earn-farm';
import { RedirectLang } from '@/views/home/components';

interface EarnFarmPageProps {
  tokenAddress: string;
}

const EarnFarmPage: NextPage<EarnFarmPageProps> = ({ tokenAddress }) => {
  if (!tokenAddress) return null;

  return (
    <>
      <RedirectLang />
      <EarnFarm address={tokenAddress as string} />
    </>
  );
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
        ...require(`../../../assets/messages/earn/token-address/${LOCALES[locale]}.json`),
        ...require(`../../../assets/messages/common/${LOCALES[locale]}.json`),
      },
    },
  };
};

export default EarnFarmPage;
