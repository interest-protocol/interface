import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';

import { Web3Manager } from '@/components';
import { StakeState } from '@/constants';
import { withAddressGuard } from '@/HOC';
import { NextPagePropsWithAddress } from '@/interface';

import FarmDetails from '../../../views/dapp/views/farm-details';

const FarmDetailsPage: NextPagePropsWithAddress = ({ pageTitle, address }) => {
  const { pathname } = useRouter();

  const [modal, setModal] = useState<StakeState | undefined>();

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <FarmDetails address={address} modalState={{ modal, setModal }} />
    </Web3Manager>
  );
};

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
