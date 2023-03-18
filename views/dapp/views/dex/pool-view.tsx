import { FC } from 'react';

import DEXViewWrapper from './dex-wrapper';
import Pool from './pool';
import { PoolProps } from './pool/pool.types';

const DEXPoolView: FC<PoolProps> = ({ poolTypeState, chainId }) => (
  <DEXViewWrapper>
    <Pool poolTypeState={poolTypeState} chainId={chainId} />
  </DEXViewWrapper>
);

export default DEXPoolView;
