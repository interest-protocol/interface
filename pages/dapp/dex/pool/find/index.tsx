import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import FindPoolView from '@/views/dapp/views/dex-find-pool';

const FindPoolPage: NextPage = () => <FindPoolView />;

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
      ...require(`../../../../../assets/messages/dex/pool/find/${LOCALES[locale]}.json`),
      ...require(`../../../../../assets/messages/common/${LOCALES[locale]}.json`),
    },
  },
});

export default FindPoolPage;
