import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Earn from '@/views/dapp/views/earn';

const EarnPage: NextPage = () => <Earn />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, earnMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/earn/${locale}.json`),
  ]);

  const messages = mergeDeepRight(commonMessages.default, earnMessages.default);

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'earn.pageTitle',
    },
  };
};

export default EarnPage;
