import { NextPage } from 'next';

import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPage = () => <FindPoolView />;

export const getStaticProps = (props: any) => {
  return {
    props: {
      messages: {
        ...require(`../../../../../assets/dex/${props.locale}.json`),
      },
    },
  };
};

export default FindPoolPage;
