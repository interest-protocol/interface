import { yupResolver } from '@hookform/resolvers/yup';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useForm } from 'react-hook-form';

import { withAddressGuard } from '@/HOC';
import { useIdAccount } from '@/hooks';
import { NextPagePropsWithAddress } from '@/interface';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import { borrowFormValidation } from '@/views/dapp/views/dinero-market-panel/components/borrow-form/borrow-form.validator';
import { BORROW_DEFAULT_VALUES } from '@/views/dapp/views/dinero-market-panel/dinero-market.data';
import { IBorrowForm } from '@/views/dapp/views/dinero-market-panel/dinero-market.types';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const DineroMarketBorrowPage: NextPagePropsWithAddress = ({
  pageTitle,
  address,
}) => {
  const { pathname } = useRouter();
  const { chainId, account } = useIdAccount();
  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DineroMarketMode
        address={address}
        mode="borrow"
        chainId={chainId}
        account={account}
        form={form}
      />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-market/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroMarketMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'dineroMarketAddress.pageTitleBorrow',
    },
  };
};

export default withAddressGuard(DineroMarketBorrowPage);
