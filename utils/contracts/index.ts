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
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import InterestViewDineroABI from '@/sdk/abi/interest-view-dinero.abi.json';
import InterestViewMAILABI from '@/sdk/abi/interest-view-MAIL.abi.json';
import MultiCallV2ABI from '@/sdk/abi/multi-call-v2.abi.json';
import {
  CONTRACTS,
  DINERO_MARKET_CONTRACT_MAP,
  TOKEN_SYMBOL,
} from '@/sdk/constants';

import {
  CasaDePapelAbi,
  InterestErc20MarketAbi,
  InterestViewBalancesAbi,
  InterestViewDineroAbi,
  InterestViewMAILAbi,
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

export const getInterestViewMAILAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INTEREST_VIEW_MAIL
);

export const getInterestViewBalancesAddress: GetContractAddress =
  makeGetAddress(CONTRACTS.INTEREST_VIEW_BALANCES);

export const getInterestViewDineroAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INTEREST_VIEW_DINERO
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

export const getWETHAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.WETH
);

export const getUSDCAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.USDC
);

export const getUSDTAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.USDT
);

export const getAPEAddress: GetContractAddress = makeGetAddress(CONTRACTS.APE);

export const getUNIAddress: GetContractAddress = makeGetAddress(CONTRACTS.UNI);

export const getAddressWithSymbol = (chainId: number) =>
  cond([
    [equals(TOKEN_SYMBOL.BTC), always(getBTCAddress(chainId))],
    [equals(TOKEN_SYMBOL.DNR), always(getDNRAddress(chainId))],
    [equals(TOKEN_SYMBOL.INT), always(getIntAddress(chainId))],
    [equals(TOKEN_SYMBOL.WETH), always(getWETHAddress(chainId))],
    [equals(TOKEN_SYMBOL.USDC), always(getUSDCAddress(chainId))],
    [equals(TOKEN_SYMBOL.USDT), always(getUSDTAddress(chainId))],
    [equals(TOKEN_SYMBOL.APE), always(getAPEAddress(chainId))],
    [equals(TOKEN_SYMBOL.UNI), always(getUNIAddress(chainId))],
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

export const getInterestViewBalancesContract: GetContract<InterestViewBalancesAbi> =
  (chainId, provider) =>
    new ethers.Contract(
      getInterestViewBalancesAddress(chainId),
      InterestViewBalancesABI,
      provider
    ) as InterestViewBalancesAbi;

export const getERC20InterestMarket: GetDineroSignerContract<InterestErc20MarketAbi> =
  (chainId, tokenSymbol, signer) =>
    new ethers.Contract(
      getDineroMarketAddress(chainId, tokenSymbol),
      InterestERC20MarketABI,
      signer
    ) as InterestErc20MarketAbi;

export const getInterestViewMAILContract: GetContract<InterestViewMAILAbi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getInterestViewMAILAddress(chainId),
    InterestViewMAILABI,
    provider
  ) as InterestViewMAILAbi;

export const getInterestViewDineroContract: GetContract<InterestViewDineroAbi> =
  (chainId, provider) =>
    new ethers.Contract(
      getInterestViewDineroAddress(chainId),
      InterestViewDineroABI,
      provider
    ) as InterestViewDineroAbi;
