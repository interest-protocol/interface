import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { mergeDeepRight } from 'ramda';

const DynamicFindPoolView = dynamic(
  () => import('../../../../views/dapp/views/dex-find-pool')
);

const FindPoolPage: NextPage = () => <DynamicFindPoolView />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexPoolFindMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/find/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolFindMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'dexPoolFind.pageTitle',
    },
  };
};

export default FindPoolPage;
