import { StaticJsonRpcProvider } from '@ethersproject/providers';

import { RPC_URL } from '@/constants/chains';

export const getStaticWeb3Provider = (chainId: number): StaticJsonRpcProvider =>
  new StaticJsonRpcProvider(RPC_URL[chainId]);
