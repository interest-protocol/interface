import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

const DEXPoolPage: NextPage = () => <div>DEX Pool</div>;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexPoolMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'dexPool.pageTitle',
    },
  };
};

export default DEXPoolPage;
