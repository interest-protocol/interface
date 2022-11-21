import { GetStaticProps, NextPage } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddress } from '@/HOC';
import FarmDetails from '@/views/dapp/views/farm-details';

interface Props {
  address: string;
}

const FarmDetailsPage: NextPage<Props> = ({ address }) => (
  <FarmDetails address={address} />
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, farmsMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/farms/details/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    farmsMessages.default
  );

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'farmsDetails.pageTitle',
    },
  };
};

export default withAddress(FarmDetailsPage);
