import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useForm } from 'react-hook-form';

import { useIdAccount } from '@/hooks';
import { NextPageWithProps } from '@/interface';
import {
  ISyntheticMarketSummaryForm,
  SyntheticMarketSortByFilter,
} from '@/views/dapp/views/synthetics-market/synthetics-market.types';

import SyntheticsMarket from '../../../views/dapp/views/synthetics-market';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const SyntheticsMarketPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();
  const { chainId, account } = useIdAccount();

  const formSyntheticMarketSummary = useForm<ISyntheticMarketSummaryForm>({
    defaultValues: {
      search: '',
      sortBy: SyntheticMarketSortByFilter.Default,
      onlyMinted: false,
    },
  });
  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <SyntheticsMarket
        chainId={chainId}
        account={account}
        formSyntheticMarketSummary={formSyntheticMarketSummary}
      />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, syntheticsMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/synthetics-market/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    syntheticsMarketMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'syntheticsMarket.pageTitle',
    },
  };
};

export default SyntheticsMarketPage;
