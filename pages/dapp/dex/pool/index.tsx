import { NextPage } from 'next';

import DEXView from '@/views/dapp/views/dex';

const DEXPoolPage: NextPage = () => <DEXView />;

export const getStaticProps = (props: any) => {
  return {
    props: {
      messages: {
        ...require(`../../../../assets/dex/${props.locale}.json`),
      },
    },
  };
};

export default DEXPoolPage;
