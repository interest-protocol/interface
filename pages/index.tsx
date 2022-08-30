/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import Home from '@/views/home';

const HomePage: NextPage = () => <Home />;

export const getStaticProps = ({
  locale = LocalesEnum.EN,
  ...otherProps
}: {
  locale: LocalesEnum;
}) => ({
  props: {
    ...otherProps,
    ...require(`../assets/messages/index/${LOCALES[locale]}.json`),
    ...require(`../assets/messages/common/${LOCALES[locale]}.json`),
  },
});

export default HomePage;
