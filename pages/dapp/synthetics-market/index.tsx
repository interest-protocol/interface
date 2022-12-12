import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

const DynamicSyntheticsMarket = dynamic(
  () => import('../../../views/dapp/views/synthetics-market')
);

const SyntheticsMarketPage: NextPage = () => <DynamicSyntheticsMarket />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, syntheticsMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/synthetics-market/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    syntheticsMarketMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'syntheticsMarket.pageTitle',
    },
  };
};

export default SyntheticsMarketPage;
