import { yupResolver } from '@hookform/resolvers/yup';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { withAddressGuard } from '@/HOC';
import { useChainId } from '@/hooks';
import { NextPagePropsWithAddress } from '@/interface';
import { syntheticsFormValidation } from '@/views/dapp/views/synthetics-market-panel/synthetics-form.validator';
import { SYNT_FORM_DEFAULT_VALUES } from '@/views/dapp/views/synthetics-market-panel/synthetics-market-panel.data';
import { ISyntheticForm } from '@/views/dapp/views/synthetics-market-panel/synthetics-market-panel.types';

import DynamicSyntheticsMarketMode from '../../../views/dapp/views/synthetics-market-panel';

const SyntheticsBurnPage: NextPagePropsWithAddress = ({
  pageTitle,
  address,
}) => {
  const { pathname } = useRouter();
  const [loadingBurn, setLoadingBurn] = useState(false);
  const [loadingMint, setLoadingMint] = useState(false);

  const formSynthetics = useForm<ISyntheticForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: SYNT_FORM_DEFAULT_VALUES,
    resolver: yupResolver(syntheticsFormValidation),
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DynamicSyntheticsMarketMode
        address={address}
        mode="burn"
        formSynthetics={formSynthetics}
        loadingBurnState={{ loading: loadingBurn, setLoading: setLoadingBurn }}
        loadingMintState={{ loading: loadingMint, setLoading: setLoadingMint }}
      />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, syntheticMarketMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/synthetics-market/address/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    syntheticMarketMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'syntheticsMarketAddress.burn.pageTitle',
    },
  };
};

export default withAddressGuard(SyntheticsBurnPage);
