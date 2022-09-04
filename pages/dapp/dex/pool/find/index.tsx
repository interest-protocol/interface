import { GetStaticProps, NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPage = () => <FindPoolView />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../../../assets/messages/dex/pool/find/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
      ...require(`../../../../../assets/messages/common/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
    },
  },
});

export default FindPoolPage;
