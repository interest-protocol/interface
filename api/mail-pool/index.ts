import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

import MAILMarketPoolABI from '@/sdk/abi/mail-market.abi.json';

import { MailMarketAbi } from '../../types/ethers-contracts';

export const mailDeposit = (
  chainId: number,
  signer: JsonRpcSigner,
  pool: string,
  token: string,
  amount: BigNumber,
  to: string
) => {
  const contract = new ethers.Contract(
    pool,
    MAILMarketPoolABI,
    signer
  ) as MailMarketAbi;

  return contract.deposit(token, amount, to);
};

export const mailWithdraw = (
  chainId: number,
  signer: JsonRpcSigner,
  pool: string,
  token: string,
  amount: BigNumber,
  to: string
) => {
  const contract = new ethers.Contract(
    pool,
    MAILMarketPoolABI,
    signer
  ) as MailMarketAbi;

  return contract.withdraw(token, amount, to);
};

export const mailBorrow = (
  chainId: number,
  signer: JsonRpcSigner,
  pool: string,
  token: string,
  amount: BigNumber,
  to: string
) => {
  const contract = new ethers.Contract(
    pool,
    MAILMarketPoolABI,
    signer
  ) as MailMarketAbi;

  return contract.borrow(token, amount, to);
};

export const mailRepay = (
  chainId: number,
  signer: JsonRpcSigner,
  pool: string,
  token: string,
  principal: BigNumber,
  to: string
) => {
  const contract = new ethers.Contract(
    pool,
    MAILMarketPoolABI,
    signer
  ) as MailMarketAbi;

  return contract.repay(token, principal, to);
};
