import { NextPage } from 'next';

import DEXView from '@/views/dapp/views/dex';

const DEXPoolPage: NextPage = () => <DEXView />;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = ({ locale, ...otherProps }: { locale: any }) => {
  return {
    props: {
      ...otherProps,
      messages: {
        ...require(`../../../../assets/messages/dex/pool/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
        ...require(`../../../../assets/messages/common/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
      },
    },
  };
};

export default DEXPoolPage;
