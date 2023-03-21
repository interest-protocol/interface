import { FC } from 'react';

import DEXViewWrapper from './dex-wrapper';
import Swap from './swap';

const DEXSwapView: FC = () => (
  <DEXViewWrapper>
    <Swap />
  </DEXViewWrapper>
);

export default DEXSwapView;
