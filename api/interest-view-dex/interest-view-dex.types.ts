import { BigNumber } from 'ethers';

import { ERC20MetadataStructOutput } from '../../types/ethers-contracts/InterestViewDexAbi';

export type GetAmountsOut = (
  chainId: number,
  tokenIn: string,
  tokenOut: string,
  amountIn: BigNumber,
  bases: string[]
) => Promise<[string, BigNumber] & { base: string; amountOut: BigNumber }>;

export type GetInterestDEXViewERC20Metadata = (
  chainId: number,
  token: string
) => Promise<ERC20MetadataStructOutput>;
