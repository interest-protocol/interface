import { FC } from 'react';

import DEXViewWrapper from './dex-wrapper';
import Swap from './swap';
import { SwapProps } from './swap/swap.types';

const DEXSwapView: FC<SwapProps> = ({
  setLocalSettings,
  localSettings,
  showSettingsState,
  isTokenInOpenModalState,
  isTokenOutOpenModalState,
}) => (
  <DEXViewWrapper>
    <Swap
      setLocalSettings={setLocalSettings}
      localSettings={localSettings}
      showSettingsState={showSettingsState}
      isTokenInOpenModalState={isTokenInOpenModalState}
      isTokenOutOpenModalState={isTokenOutOpenModalState}
    />
  </DEXViewWrapper>
);

export default DEXSwapView;
