import { GetStaticProps, NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import Faucet from '@/views/dapp/views/faucet';

const FaucetPage: NextPage = () => <Faucet />;

export const getStaticProps: GetStaticProps = ({ locale, ...otherProps }) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/faucet/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
      ...require(`../../../assets/messages/common/${
        LOCALES[(locale as LocalesEnum) || LocalesEnum.EN]
      }.json`),
    },
  },
});

export default FaucetPage;
