import { GetStaticProps, NextPage } from 'next';

import RedirectLang from '@/components/redirect-lang';
import Earn from '@/views/dapp/views/earn';

const EarnPage: NextPage = () => (
  <>
    <RedirectLang />
    <Earn />
  </>
);

export const getStaticProps: GetStaticProps = async ({
  locale,
  ...otherProps
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/earn/${locale}.json`),
      ...require(`../../../assets/messages/common/${locale}.json`),
    },
  },
});

export default EarnPage;
