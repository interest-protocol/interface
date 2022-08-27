import { NextPage } from 'next';

import Faucet from '@/views/dapp/views/faucet';
import { RedirectLang } from '@/views/home/components';

const FaucetPage: NextPage = () => (
  <>
    <RedirectLang />
    <Faucet />
  </>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = ({ locale, ...otherProps }: { locale: any }) => {
  return {
    props: {
      ...otherProps,
      messages: {
        ...require(`../../../assets/messages/faucet/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
        ...require(`../../../assets/messages/common/${
          locale == 'en-US' ? 'en' : 'pt'
        }.json`),
      },
    },
  };
};

export default FaucetPage;
