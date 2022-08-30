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
      ...require(`../../../../assets/messages/dex/pool//${
        LOCALES[locale] || LOCALES[LocalesEnum.EN]
      }.json`),
      ...require(`../../../../assets/messages/common/${
        LOCALES[locale] || LOCALES[LocalesEnum.EN]
      }.json`),
    },
  },
});

export default DEXPoolPage;
