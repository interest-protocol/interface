import { GetStaticProps } from 'next';
import { mergeDeepRight } from 'ramda';

import { withAddressGuard } from '@/HOC';
import { NextPageWithAddress } from '@/interface';
import FarmDetails from '@/views/dapp/views/farm-details';

const FarmDetailsPage: NextPageWithAddress = ({ address }) => (
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
      now: Date.now(),
      pageTitle: 'farmsDetails.pageTitle',
    },
  };
};

export default withAddressGuard(FarmDetailsPage);
