import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

const DynamicFarms = dynamic(() => import('../../../views/dapp/views/farms'));

const FarmsPage: NextPage = () => <DynamicFarms />;

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
      now: Date.now(),
      pageTitle: 'farms.pageTitle',
    },
  };
};

export default FarmsPage;
