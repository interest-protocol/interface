import { useTranslations } from 'next-intl';
import { FC } from 'react';

import ErrorPage from '../error';
import RedStoneBurnButton from './components/buttons/red-stone-burn-button';
import RedStoneMintButton from './components/buttons/red-stone-mint-button';
import { useRedstoneSynthsPanel } from './synthetics-market-panel.hooks';
import { SyntheticsMarketPanelBranchProps } from './synthetics-market-panel.types';
import SyntheticsMarketPanelContent from './synthetics-market-panel-content';

const SyntheticsMarketPanelRedStone: FC<SyntheticsMarketPanelBranchProps> = ({
  mode,
  form,
  address,
  oracleType,
  dataFeedId,
  collateralAddress,
}) => {
  const t = useTranslations();

  const { error, market, refetch, rewardsInfo, myPositionData } =
    useRedstoneSynthsPanel({
      address,
      collateralAddress,
      dataFeedId,
      oracleType,
    });

  const handleRefetch = async () => {
    await refetch();
  };

  if (error) return <ErrorPage message={t('common.error')} />;

  return (
    <SyntheticsMarketPanelContent
      mode={mode}
      form={form}
      market={market}
      address={address}
      rewardsInfo={rewardsInfo}
      myPositionData={myPositionData}
      refetch={handleRefetch}
      burnButton={
        <RedStoneBurnButton form={form} data={market} refetch={handleRefetch} />
      }
      mintButton={
        <RedStoneMintButton form={form} data={market} refetch={handleRefetch} />
      }
    />
  );
};

export default SyntheticsMarketPanelRedStone;
