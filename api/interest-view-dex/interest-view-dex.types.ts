import { BigNumber } from 'ethers';

import {
  ERC20MetadataStructOutput,
  PairMetadataStructOutput,
} from '../../types/ethers-contracts/InterestViewDexAbi';

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

export type GetInterestDEXViewPairData = (
  chainId: number,
  pairAddress: string,
  account: string
) => Promise<
  [PairMetadataStructOutput, BigNumber[], BigNumber[]] & {
    pairMetadata: PairMetadataStructOutput;
    allowances: BigNumber[];
    balances: BigNumber[];
  }
>;
