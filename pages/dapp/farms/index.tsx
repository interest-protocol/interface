import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import Farms from '@/views/dapp/views/farms';

const FarmsPage: NextPage = () => <Farms />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, farmsMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/farms/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    farmsMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'farms.pageTitle',
    },
  };
};

export default FarmsPage;
