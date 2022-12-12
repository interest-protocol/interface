import { yupResolver } from '@hookform/resolvers/yup';
import { ethers } from 'ethers';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
  SyntheticOracleType,
  SYNTHETICS_MARKET_PANEL_CALL_MAP,
} from '@/constants';
import { useChainId } from '@/hooks';

import { syntheticsFormValidation } from './synthetics-form.validator';
import { SYNT_FORM_DEFAULT_VALUES } from './synthetics-market-panel.data';
import {
  ISyntheticForm,
  SyntheticsMarketPanelProps,
} from './synthetics-market-panel.types';
import SyntheticsMarketPanelRedStone from './synthetics-market-panel-red-stone';
import SyntheticsMarketPanelWagmi from './synthetics-market-panel-wagmi';

const SyntheticsMarketPanel: FC<SyntheticsMarketPanelProps> = ({
  mode,
  address,
}) => {
  const form = useForm<ISyntheticForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: SYNT_FORM_DEFAULT_VALUES,
    resolver: yupResolver(syntheticsFormValidation),
  });

  const chainId = useChainId();

  const { dataFeedId, oracleType, collateralAddress } = pathOr(
    {
      dataFeedId: '',
      oracleType: SyntheticOracleType.ChainLink,
      collateralAddress: '',
    },
    [chainId.toString(), ethers.utils.getAddress(address)],
    SYNTHETICS_MARKET_PANEL_CALL_MAP
  );

  if (
    oracleType === SyntheticOracleType.RedStoneConsumer ||
    oracleType === SyntheticOracleType.RedStonePriceAware
  )
    return (
      <SyntheticsMarketPanelRedStone
        mode={mode}
        form={form}
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
      form={form}
      oracleType={oracleType}
      dataFeedId={dataFeedId}
      collateralAddress={collateralAddress}
    />
  );
};

export default SyntheticsMarketPanel;
