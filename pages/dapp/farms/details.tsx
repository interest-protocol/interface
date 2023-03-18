import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';

import { StakeState } from '@/constants';
import { withAddressGuard } from '@/HOC';
import { useChainId } from '@/hooks';
import { NextPagePropsWithAddress } from '@/interface';

import FarmDetails from '../../../views/dapp/views/farm-details';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const FarmDetailsPage: NextPagePropsWithAddress = ({ pageTitle, address }) => {
  const { pathname } = useRouter();
  const chainId = useChainId();
  const [modal, setModal] = useState<StakeState | undefined>();

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <FarmDetails
        address={address}
        chainId={chainId}
        modalState={{ modal, setModal }}
      />
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
