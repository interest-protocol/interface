import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { NextPageWithProps } from '@/interface';
import DineroMarket from '@/views/dapp/views/dinero-market';
import { BorrowSortByFilter } from '@/views/dapp/views/dinero-market/components/borrow-filters/borrow-filters.types';
import { IDineroMarketForm } from '@/views/dapp/views/dinero-market/dinero-market.types';

const DineroMarketPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();

  const formDineroMarket = useForm<IDineroMarketForm>({
    defaultValues: {
      search: '',
      sortBy: BorrowSortByFilter.Default,
      onlyBorrowing: false,
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DineroMarket formDineroMarket={formDineroMarket} />
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
