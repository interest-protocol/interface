import { GetStaticProps, NextPage } from 'next';

import RedirectLang from '@/components/redirect-lang';
import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPage = () => (
  <>
    <RedirectLang />
    <FindPoolView />
  </>
);

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../../../assets/messages/dex/pool/find/${locale}.json`),
      ...require(`../../../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default FindPoolPage;
