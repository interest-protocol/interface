import { NextPage } from 'next';

import FindPoolView from '@/views/dapp/views/dex-find-pool';
import { RedirectLang } from '@/views/home/components';

const FindPoolPage: NextPage = () => (
  <>
    <RedirectLang />
    <FindPoolView />
  </>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = ({ locale, ...otherProps }: { locale: any }) => {
  return {
    props: {
      ...otherProps,
      messages: {
        ...require(`../../../../../assets/messages/dex/pool/find/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
        ...require(`../../../../../assets/messages/common/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
      },
    },
  };
};

export default FindPoolPage;
