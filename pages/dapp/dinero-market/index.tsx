import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import DineroMarket from '@/views/dapp/views/dinero-market';

const DineroMarketPage: NextPage = () => <DineroMarket />;

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
      ...require(`../../../assets/messages/dinero-market/${LOCALES[locale]}.json`),
      ...require(`../../../assets/messages/common/${LOCALES[locale]}.json`),
    },
  },
});

export default DineroMarketPage;
