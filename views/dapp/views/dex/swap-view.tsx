import { FC } from 'react';

import DEXViewWrapper from './dex-wrapper';
import Swap from './swap';
import { SwapProps } from './swap/swap.types';

const DEXSwapView: FC<SwapProps> = ({
  chainId,
  account,
  setLocalSettings,
  localSettings,
  formSwap,
  showSettingsState,
  hasNoMarketState,
  isFetchingAmountOutTokenInState,
  isFetchingAmountOutTokenOutState,
  isTokenInOpenModalState,
  isTokenOutOpenModalState,
  swapBaseState,
  amountOutErrorState,
}) => (
  <DEXViewWrapper>
    <Swap
      chainId={chainId}
      account={account}
      setLocalSettings={setLocalSettings}
      localSettings={localSettings}
      formSwap={formSwap}
      showSettingsState={showSettingsState}
      hasNoMarketState={hasNoMarketState}
      isFetchingAmountOutTokenInState={isFetchingAmountOutTokenInState}
      isFetchingAmountOutTokenOutState={isFetchingAmountOutTokenOutState}
      isTokenInOpenModalState={isTokenInOpenModalState}
      isTokenOutOpenModalState={isTokenOutOpenModalState}
      swapBaseState={swapBaseState}
      amountOutErrorState={amountOutErrorState}
    />
  </DEXViewWrapper>
);

export default DEXSwapView;
