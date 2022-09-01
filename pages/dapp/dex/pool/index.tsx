import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import DEXView from '@/views/dapp/views/dex';

const DEXPoolPage: NextPage = () => <DEXView />;

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
      ...require(`../../../../assets/messages/dex/pool/${LOCALES[locale]}.json`),
      ...require(`../../../../assets/messages/common/${LOCALES[locale]}.json`),
    },
  },
});

export default DEXPoolPage;
