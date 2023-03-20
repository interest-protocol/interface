import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { StakeState } from '@/constants';
import { withAddressGuard } from '@/HOC';
import { NextPagePropsWithAddress } from '@/interface';
import DineroVault from '@/views/dapp/views/dinero-vault';
import { IVaultForm } from '@/views/dapp/views/dinero-vault/dinero-vault.types';

const DineroVaultPage: NextPagePropsWithAddress = ({ pageTitle, address }) => {
  const { pathname } = useRouter();
  const [stakeState, setStakeState] = useState(StakeState.Stake);
  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const formVault = useForm<IVaultForm>({
    defaultValues: {
      value: '',
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DineroVault
        vault={address}
        stakeDVState={{ stakeState, setStakeState }}
        formVault={formVault}
        loadinDepositState={{
          loading: loadingDeposit,
          setLoading: setLoadingDeposit,
        }}
        loadinWithdrawState={{
          loading: loadingWithdraw,
          setLoading: setLoadingWithdraw,
        }}
        openDetailsState={{ openDetails, setOpenDetails }}
        detailRef={detailRef}
      />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dineroVaultMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/dinero-vault/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dineroVaultMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'dineroVault.pageTitle',
    },
  };
};

export default withAddressGuard(DineroVaultPage);
