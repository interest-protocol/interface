import { ContractReceipt, ethers } from 'ethers';
import { __, compose, propOr, toString } from 'ramda';

import CasaDePapelABI from '@/sdk/abi/casa-de-papel.abi.json';
import DineroERC20MarketABI from '@/sdk/abi/dinero-erc-20-market.abi.json';
import DineroLpFreeMarketABI from '@/sdk/abi/dinero-lp-free-market.abi.json';
import DineroNativeMarketABI from '@/sdk/abi/dinero-native-market.abi.json';
import InterestDexFactoryABI from '@/sdk/abi/interest-dex-factory.abi.json';
import InterestDexRouterABI from '@/sdk/abi/interest-dex-router.abi.json';
import InterestViewBalancesABI from '@/sdk/abi/interest-view-balances.abi.json';
import InterestViewDexABI from '@/sdk/abi/interest-view-dex.abi.json';
import InterestViewDineroV2ABI from '@/sdk/abi/interest-view-dinero-v2.abi.json';
import InterestViewEarnABI from '@/sdk/abi/interest-view-earn.abi.json';
import TokenMinterABI from '@/sdk/abi/token-minter.abi.json';
import WETHABI from '@/sdk/abi/weth.abi.json';
import { CONTRACTS } from '@/sdk/constants';
import { safeGetAddress } from '@/utils/address';

import {
  CasaDePapelAbi,
  DineroErc20MarketAbi,
  DineroLpFreeMarketAbi,
  DineroNativeMarketAbi,
  InterestDexFactoryAbi,
  InterestDexRouterAbi,
  InterestViewBalancesAbi,
  InterestViewDexAbi,
  InterestViewDineroV2Abi,
  InterestViewEarnAbi,
  TokenMinterAbi,
  WethAbi,
} from '../../types/ethers-contracts';
import {
  CreateTokenEventArgs,
  GetContract,
  GetContractAddress,
  GetDineroMarketSignerContract,
  GetSignerContract,
} from './contracts.types';

const makeGetAddress = (x: Record<number, string>) =>
  compose(
    safeGetAddress,
    propOr(ethers.constants.AddressZero, __, x),
    toString
  );

export const getInterestViewMAILAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INTEREST_VIEW_MAIL
);

export const getInterestViewBalancesAddress: GetContractAddress =
  makeGetAddress(CONTRACTS.INTEREST_VIEW_BALANCES);

export const getCasaDePapelAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.CASA_DE_PAPEL
);

export const getInterestDexRouterAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INT_DEX_ROUTER
);

export const getInterestViewDexAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INTEREST_VIEW_DEX
);

export const getInterestViewDineroV2Address: GetContractAddress =
  makeGetAddress(CONTRACTS.INTEREST_VIEW_DINERO_V2);

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

export const getMAILDeployerAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.MAIL_DEPLOYER
);

export const getLINKAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.LINK
);

export const getMANAAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.MANA
);

export const getSHIBAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.SHIB
);

export const getTokenMinterAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.TOKEN_MINTER
);

export const getETHERC20Address: GetContractAddress = makeGetAddress(
  CONTRACTS.ERC20_ETH
);

export const getInterestDexFactoryAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INT_DEX_FACTORY
);

export const getInterestViewEarnAddress: GetContractAddress = makeGetAddress(
  CONTRACTS.INTEREST_VIEW_EARN
);

export const getCasaDePapelContract: GetContract<CasaDePapelAbi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getCasaDePapelAddress(chainId),
    CasaDePapelABI,
    provider
  ) as CasaDePapelAbi;

export const getInterestViewBalancesContract: GetContract<InterestViewBalancesAbi> =
  (chainId, provider) =>
    new ethers.Contract(
      getInterestViewBalancesAddress(chainId),
      InterestViewBalancesABI,
      provider
    ) as InterestViewBalancesAbi;

export const getDineroERC20Market: GetDineroMarketSignerContract<DineroErc20MarketAbi> =
  (signer, marketAddress) =>
    new ethers.Contract(
      marketAddress,
      DineroERC20MarketABI,
      signer
    ) as DineroErc20MarketAbi;

export const getDineroNativeMarket: GetDineroMarketSignerContract<DineroNativeMarketAbi> =
  (signer, marketAddress) =>
    new ethers.Contract(
      marketAddress,
      DineroNativeMarketABI,
      signer
    ) as DineroNativeMarketAbi;

export const getDineroLPFreeMarket: GetDineroMarketSignerContract<DineroLpFreeMarketAbi> =
  (signer, marketAddress) =>
    new ethers.Contract(
      marketAddress,
      DineroLpFreeMarketABI,
      signer
    ) as DineroLpFreeMarketAbi;

export const getInterestViewEarnContract: GetContract<InterestViewEarnAbi> = (
  chainID,
  provider
) =>
  new ethers.Contract(
    getInterestViewEarnAddress(chainID),
    InterestViewEarnABI,
    provider
  ) as InterestViewEarnAbi;

export const getTokenMinterSignerContract: GetSignerContract<TokenMinterAbi> = (
  chainId,
  signer
) =>
  new ethers.Contract(
    getTokenMinterAddress(chainId),
    TokenMinterABI,
    signer
  ) as TokenMinterAbi;

export const extractCreateTokenEvent = (
  receipt: ContractReceipt
): CreateTokenEventArgs => {
  const iFace = new ethers.utils.Interface(TokenMinterABI);
  const log = iFace.parseLog(receipt.logs[1]);
  return <CreateTokenEventArgs>log.args;
};

export const getInterestDexRouterContract: GetContract<InterestDexRouterAbi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getInterestDexRouterAddress(chainId),
    InterestDexRouterABI,
    provider
  ) as InterestDexRouterAbi;

export const getInterestViewDexContract: GetContract<InterestViewDexAbi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getInterestViewDexAddress(chainId),
    InterestViewDexABI,
    provider
  ) as InterestViewDexAbi;

export const getWETHContract: GetContract<WethAbi> = (chainId, provider) =>
  new ethers.Contract(getWETHAddress(chainId), WETHABI, provider) as WethAbi;

export const getInterestDexFactoryContract: GetContract<InterestDexFactoryAbi> =
  (chainId, provider) =>
    new ethers.Contract(
      getInterestDexFactoryAddress(chainId),
      InterestDexFactoryABI,
      provider
    ) as InterestDexFactoryAbi;

export const getInterestViewDineroV2: GetContract<InterestViewDineroV2Abi> = (
  chainId,
  provider
) =>
  new ethers.Contract(
    getInterestViewDineroV2Address(chainId),
    InterestViewDineroV2ABI,
    provider
  ) as InterestViewDineroV2Abi;
