import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import MAILMarket from '@/views/dapp/views/mail-market';

const MAILMarketPage: NextPage = () => <MAILMarket />;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = ({
  locale = LocalesEnum.EN,
  ...otherProps
}: {
  locale: LocalesEnum;
}) => ({
  props: {
    ...otherProps,
    messages: {
      ...require(`../../../assets/messages/mail-market/${LOCALES[locale]}.json`),
      ...require(`../../../assets/messages/common/${LOCALES[locale]}.json`),
    },
  },
});

export default MAILMarketPage;
