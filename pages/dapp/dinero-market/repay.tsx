import { yupResolver } from '@hookform/resolvers/yup';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { withAddressGuard } from '@/HOC';
import { NextPagePropsWithAddress } from '@/interface';
import DineroMarketMode from '@/views/dapp/views/dinero-market-panel';
import { borrowFormValidation } from '@/views/dapp/views/dinero-market-panel/components/borrow-form/borrow-form.validator';
import { BORROW_DEFAULT_VALUES } from '@/views/dapp/views/dinero-market-panel/dinero-market.data';
import { IBorrowForm } from '@/views/dapp/views/dinero-market-panel/dinero-market.types';

const DineroMarketRepayPage: NextPagePropsWithAddress = ({
  pageTitle,
  address,
}) => {
  const { pathname } = useRouter();

  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DineroMarketMode address={address} mode="repay" form={form} />
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
      pageTitle: 'dineroMarketAddress.pageTitleRepay',
    },
  };
};

export default withAddressGuard(DineroMarketRepayPage);
