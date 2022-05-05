import { ethers } from 'ethers';
import {
  __,
  always,
  compose,
  cond,
  equals,
  pathOr,
  propOr,
  T,
  toString,
} from 'ramda';

import CasaDePapelABI from '@/sdk/abi/casa-de-papel.abi.json';
import InterestERC20MarketABI from '@/sdk/abi/interest-erc-20-market.abi.json';
import InterestViewABI from '@/sdk/abi/interest-view.abi.json';
import MultiCallV2ABI from '@/sdk/abi/multi-call-v2.abi.json';
import {
  CONTRACTS,
  DINERO_MARKET_CONTRACT_MAP,
  TOKEN_SYMBOL,
} from '@/sdk/constants';

import {
  CasaDePapelAbi,
  InterestErc20MarketAbi,
  InterestViewAbi,
  MultiCallV2Abi,
} from '../../types/ethers-contracts';
import {
  GetContract,
  GetContractAddress,
  GetDineroSignerContract,
} from './contracts.types';

const makeGetAddress = (x: Record<number, string>) =>
  compose(
    ethers.utils.getAddress,
    propOr(ethers.constants.AddressZero, __, x),
    toString
  );

export const getMultiCallV2Address: GetContractAddress = makeGetAddress(
  CONTRACTS.MULTI_CALL
);

export const getInterestViewAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INTEREST_VIEW
);

export const getCasaDePapelAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.CASA_DE_PAPEL
);

export const getDineroMarketAddress = (
  chainId: number,
  symbol: TOKEN_SYMBOL
): string =>
  pathOr(
    ethers.constants.AddressZero,
    [chainId, symbol],
    DINERO_MARKET_CONTRACT_MAP
  );

export const getBTCAddress: GetContractAddress = makeGetAddress(CONTRACTS.BTC);

export const getIntAddress: GetContractAddress = makeGetAddress(CONTRACTS.INT);

export const getDNRAddress: GetContractAddress = makeGetAddress(CONTRACTS.DNR);

export const getAddressWithSymbol = (chainId: number) =>
  cond([
    [equals(TOKEN_SYMBOL.BTC), always(getBTCAddress(chainId))],
    [equals(TOKEN_SYMBOL.DNR), always(getDNRAddress(chainId))],
    [equals(TOKEN_SYMBOL.INT), always(getIntAddress(chainId))],
    [T, always(ethers.constants.AddressZero)],
  ]);

export const getCasaDePapelContract: GetContract<CasaDePapelAbi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getCasaDePapelAddress(chainId),
    CasaDePapelABI,
    provider
  ) as CasaDePapelAbi;

export const getMultiCallV2Contract: GetContract<MultiCallV2Abi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getMultiCallV2Address(chainId),
    MultiCallV2ABI,
    provider
  ) as MultiCallV2Abi;

export const getInterestViewContract: GetContract<InterestViewAbi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getInterestViewAddress(chainId),
    InterestViewABI,
    provider
  ) as InterestViewAbi;

export const getERC20InterestMarket: GetDineroSignerContract<InterestErc20MarketAbi> =
  (chainId, tokenSymbol, signer) =>
    new ethers.Contract(
      getDineroMarketAddress(chainId, tokenSymbol),
      InterestERC20MarketABI,
      signer
    ) as InterestErc20MarketAbi;
