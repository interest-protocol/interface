import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { NextPageWithProps } from '@/interface';
import {
  ISyntheticMarketSummaryForm,
  SyntheticMarketSortByFilter,
} from '@/views/dapp/views/synthetics-market/synthetics-market.types';

import SyntheticsMarket from '../../../views/dapp/views/synthetics-market';

const SyntheticsMarketPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();

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
