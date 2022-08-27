import { NextPage } from 'next';

import Earn from '@/views/dapp/views/earn';
import { RedirectLang } from '@/views/home/components';

const EarnPage: NextPage = () => (
  <>
    <RedirectLang />
    <Earn />
  </>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = ({ locale, ...otherProps }: { locale: any }) => {
  return {
    props: {
      ...otherProps,
      messages: {
        ...require(`../../../assets/messages/earn/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
        ...require(`../../../assets/messages/common/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
      },
    },
  };
};

export default EarnPage;
