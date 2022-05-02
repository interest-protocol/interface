import { ethers } from 'ethers';
import { __, always, compose, cond, equals, propOr, T, toString } from 'ramda';

import InterestViewABI from '@/sdk/abi/interest-view.abi.json';
import MultiCallV2ABI from '@/sdk/abi/multi-call-v2.abi.json';
import { CONTRACTS, TOKEN_SYMBOL } from '@/sdk/constants';

import { InterestViewAbi, MultiCallV2Abi } from '../../types/ethers-contracts';
import { GetContractAddress, GetViewContract } from './contracts.types';

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

export const getMultiCallV2Contract: GetViewContract<MultiCallV2Abi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getMultiCallV2Address(chainId),
    MultiCallV2ABI,
    provider
  ) as MultiCallV2Abi;

export const getInterestViewContract: GetViewContract<InterestViewAbi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getInterestViewAddress(chainId),
    InterestViewABI,
    provider
  ) as InterestViewAbi;
