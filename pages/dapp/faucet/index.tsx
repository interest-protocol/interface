import { NextPage } from 'next';

import { LOCALES, LocalesEnum } from '@/constants/locale';
import Faucet from '@/views/dapp/views/faucet';

const FaucetPage: NextPage = () => <Faucet />;

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
      ...require(`../../../assets/messages/faucet/${LOCALES[locale]}.json`),
      ...require(`../../../assets/messages/common/${LOCALES[locale]}.json`),
    },
  },
});

export default FaucetPage;
