import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import Earn from '@/views/dapp/views/earn';
import { RedirectLang } from '@/views/home/components';

const EarnPage: NextPage = () => (
  <>
    <RedirectLang />
    <Earn />
  </>
);

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
      ...require(`../../../assets/messages/earn/${LOCALES[locale]}.json`),
      ...require(`../../../assets/messages/common/${LOCALES[locale]}.json`),
    },
  },
});

export default EarnPage;
