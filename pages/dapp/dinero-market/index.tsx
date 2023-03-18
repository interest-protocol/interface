import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useForm } from 'react-hook-form';

import { useChainId } from '@/hooks';
import { NextPageWithProps } from '@/interface';
import DineroMarket from '@/views/dapp/views/dinero-market';
import { BorrowSortByFilter } from '@/views/dapp/views/dinero-market/components/borrow-filters/borrow-filters.types';
import { IDineroMarketForm } from '@/views/dapp/views/dinero-market/dinero-market.types';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const DineroMarketPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();
  const chainId = useChainId();

  const formDineroMarket = useForm<IDineroMarketForm>({
    defaultValues: {
      search: '',
      sortBy: BorrowSortByFilter.Default,
      onlyBorrowing: false,
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DineroMarket chainId={chainId} formDineroMarket={formDineroMarket} />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-market/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'dineroMarket.pageTitle',
    },
  };
};

export default DineroMarketPage;
