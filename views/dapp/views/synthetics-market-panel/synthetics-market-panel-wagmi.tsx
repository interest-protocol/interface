import { useTranslations } from 'next-intl';
import { FC } from 'react';

import ErrorPage from '../error';
import BurnButton from './components/synt-form/burn-button';
import MintButton from './components/synt-form/mint-button';
import {
  useGetRewards,
  useWagmiSynthsPanel,
} from './synthetics-market-panel.hooks';
import { SyntheticsMarketPanelBranchProps } from './synthetics-market-panel.types';
import SyntheticsMarketPanelContent from './synthetics-market-panel-content';

const SyntheticsMarketPanelWagmi: FC<SyntheticsMarketPanelBranchProps> = ({
  mode,
  address,
  form,
  oracleType,
  dataFeedId,
  collateralAddress,
}) => {
  const t = useTranslations();

  const { error, market, refetch, rewardsInfo, myPositionData } =
    useWagmiSynthsPanel({ address, collateralAddress, oracleType, dataFeedId });

  const handleRefetch = async () => {
    await refetch();
  };

  const { writeAsync: getRewards } = useGetRewards(market);

  if (error) return <ErrorPage message={t('common.error')} />;

  return (
    <SyntheticsMarketPanelContent
      mode={mode}
      form={form}
      market={market}
      address={address}
      getRewards={getRewards}
      rewardsInfo={rewardsInfo}
      myPositionData={myPositionData}
      refetch={handleRefetch}
      burnButton={
        <BurnButton form={form} data={market} refetch={handleRefetch} />
      }
      mintButton={
        <MintButton form={form} data={market} refetch={handleRefetch} />
      }
    />
  );
};

export default SyntheticsMarketPanelWagmi;
