import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { withAddressGuard } from '@/HOC';
import { NextPagePropsWithAddress } from '@/interface';
import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';
import { IAddLiquidityForm } from '@/views/dapp/views/dex-pool-details/components/add-liquidity-card/add-liquidity-card.types';
import { IRemoveLiquidityForm } from '@/views/dapp/views/dex-pool-details/components/remove-liquidity-card/remove-liquidity-card.types';

const DEXPoolDetailsPage: NextPagePropsWithAddress = ({
  pageTitle,
  address,
}) => {
  const { pathname } = useRouter();

  const formAddLiquidity = useForm<IAddLiquidityForm>({
    defaultValues: {
      token0Amount: '0.0',
      token1Amount: '0.0',
      error: '',
      locked: false,
    },
  });

  const formRemoveLiquidity = useForm<IRemoveLiquidityForm>({
    defaultValues: {
      loading: false,
      removeLoading: false,
      lpAmount: '0.0',
      token0Amount: '0.0',
      token1Amount: '0.0',
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <DEXPoolDetailsView
        pairAddress={address}
        formAddLiquidity={formAddLiquidity}
        formRemoveLiquidity={formRemoveLiquidity}
      />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, dexPoolPairMessages] = await Promise.all([
    import(`../../../../assets/messages/common/${locale}.json`),
    import(`../../../../assets/messages/dex/pool/details/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    dexPoolPairMessages.default
  );

  return {
    props: {
      messages,
      pageTitle: 'dexPoolPairAddress.pageTitle',
      now: Date.now(),
    },
  };
};

export default withAddressGuard(DEXPoolDetailsPage);
