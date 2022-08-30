import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';

interface DEXPoolDetailsPageProps {
  pairAddress: string;
}

const DEXPoolDetailsPage: NextPage<DEXPoolDetailsPageProps> = ({
  pairAddress,
}) => <DEXPoolDetailsView pairAddress={pairAddress as string} />;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = ({
  params,
  locale = LocalesEnum.EN,
}: {
  params: DEXPoolDetailsPageProps;
  locale: LocalesEnum;
}) => {
  const { pairAddress } = params;

  return {
    props: {
      pairAddress,
      messages: {
        ...require(`../../../../assets/messages/dex/pool/pair-address/${LOCALES[locale]}.json`),
        ...require(`../../../../assets/messages/common/${LOCALES[locale]}.json`),
      },
    },
  };
};

export default DEXPoolDetailsPage;
