import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC, useState } from 'react';

import {
  SyntheticOracleType,
  SYNTHETICS_MARKET_PANEL_CALL_MAP,
} from '@/constants';
import { useChainId } from '@/hooks';

import { SyntheticsMarketPanelPageProps } from './synthetics-market-panel.types';
import SyntheticsMarketPanelRedStone from './synthetics-market-panel-red-stone';
import SyntheticsMarketPanelWagmi from './synthetics-market-panel-wagmi';

const SyntheticsMarketPanel: FC<SyntheticsMarketPanelPageProps> = ({
  mode,
  address,
  formSynthetics,
}) => {
  const chainId = useChainId();
  const { dataFeedId, oracleType, collateralAddress } = pathOr(
    {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: '' as `0x${string}`,
    },
    [chainId.toString(), ethers.utils.getAddress(address)],
    SYNTHETICS_MARKET_PANEL_CALL_MAP
  );

  if (
    oracleType === SyntheticOracleType.RedStoneConsumer ||
    oracleType === SyntheticOracleType.RedstoneCustomUrl
  )
    return (
      <SyntheticsMarketPanelRedStone
        mode={mode}
        form={formSynthetics}
        address={address}
        oracleType={oracleType}
        dataFeedId={dataFeedId}
        collateralAddress={collateralAddress}
      />
    );

  return (
    <SyntheticsMarketPanelWagmi
      mode={mode}
      address={address}
      form={formSynthetics}
      oracleType={oracleType}
      dataFeedId={dataFeedId}
      collateralAddress={collateralAddress}
    />
  );
};

export default SyntheticsMarketPanel;
