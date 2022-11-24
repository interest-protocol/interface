import { ethers } from 'ethers';
import { isEmpty } from 'ramda';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { DEFAULT_ACCOUNT } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { useSafeContractRead } from '@/hooks';
import { HandlerData } from '@/interface';
import { FixedPointMath, ZERO_ADDRESS } from '@/sdk';
import InterestViewDineroV2ABI from '@/sdk/abi/interest-view-dinero-v2.abi.json';
import SyntheticMinterABI from '@/sdk/abi/synthetics-minter.abi.json';
import { isValidAccount, isZeroAddress, safeToBigNumber } from '@/utils';
import { getInterestViewDineroV2Address } from '@/utils';
import { logException } from '@/utils/analytics';

import { SyntheticMarketData } from './synthetics-market.types';

export const useGetSyntheticUserMarketData = (
  marketAddress: string,
  chainId: number,
  account: string
) => {
  const isMarketAddressValid = ethers.utils.isAddress(marketAddress);

  return useSafeContractRead({
    addressOrName: getInterestViewDineroV2Address(chainId),
    contractInterface: InterestViewDineroV2ABI,
    functionName: 'getSyntheticUserMarketData',
    args: [account || DEFAULT_ACCOUNT, marketAddress],
    enabled: isMarketAddressValid && !!chainId,
    onError: () =>
      logException({
        action: GAAction.ReadBlockchainData,
        label: `Transaction: getSyntheticUserMarketData`,
        trackerName: [
          'views/dapp/views/synthetics-market-panel/synthetics-market.hooks.ts',
        ],
      }),
  });
};

const { defaultAbiCoder } = ethers.utils;

const encodeData = (to: string, amount: ethers.BigNumber) =>
  defaultAbiCoder.encode(['address', 'uint256'], [to || ZERO_ADDRESS, amount]);

enum RequestActions {
  Deposit,
  Withdraw,
  Mint,
  Burn,
}

const handleBurnRequest = (
  market: SyntheticMarketData,
  collateral: number,
  synt: number
): HandlerData => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeBNCollateral = bnCollateral.gt(market.userCollateral)
    ? market.userCollateral
    : bnCollateral;

  const syntBN = FixedPointMath.toBigNumber(synt);

  const maxBNSyntToBurn = syntBN.gt(market.userSyntMinted)
    ? market.userSyntMinted
    : syntBN;

  const safeBNSynt = maxBNSyntToBurn.gt(market.syntBalance)
    ? market.syntBalance
    : maxBNSyntToBurn;

  const functionName = 'request';
  const args = [
    [RequestActions.Burn, RequestActions.Withdraw],
    [
      encodeData(market.account, safeBNSynt),
      encodeData(market.account, safeBNCollateral),
    ],
  ];

  const enabled = !safeBNSynt.isZero() && !safeBNCollateral.isZero();
  const overrides = {};
  const contractInterface = SyntheticMinterABI;

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

const handleWithdrawCollateral = (
  market: SyntheticMarketData,
  collateral: number
): HandlerData => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeBNCollateral = bnCollateral.gt(market.userCollateral)
    ? market.userCollateral
    : bnCollateral;

  const functionName = 'withdraw';
  const args = [market.account, safeBNCollateral];
  const enabled = !safeBNCollateral.isZero();
  const overrides = {};
  const contractInterface = SyntheticMinterABI;

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

const handleBurnSynt = (
  market: SyntheticMarketData,
  synt: number
): HandlerData => {
  const syntBN = FixedPointMath.toBigNumber(synt);

  const safeAmount = syntBN.gt(market.syntBalance)
    ? market.syntBalance
    : syntBN;

  const maxAmount = safeAmount.gt(market.userSyntMinted)
    ? market.userSyntMinted
    : safeAmount;

  const functionName = 'burn';
  const args = [market.account, maxAmount];
  const enabled = !maxAmount.isZero();
  const overrides = {};
  const contractInterface = SyntheticMinterABI;

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

export const useBurn = (
  market: SyntheticMarketData,
  collateral: string,
  synt: string
) => {
  const [safeCollateral] = useDebounce(
    isNaN(+collateral) ? 0 : +collateral,
    500
  );
  const [safeSynt] = useDebounce(isNaN(+synt) ? 0 : +synt, 500);

  let data = {} as HandlerData;

  if (!!safeCollateral && !!safeSynt)
    data = handleBurnRequest(market, safeCollateral, safeSynt);

  if (safeCollateral && !safeSynt)
    data = handleWithdrawCollateral(market, safeCollateral);

  if (safeSynt && !safeCollateral) data = handleBurnSynt(market, safeSynt);

  const { config } = usePrepareContractWrite({
    addressOrName: market.marketAddress,
    ...data,
    enabled:
      data.enabled &&
      !isEmpty(data) &&
      isValidAccount(market.account) &&
      !isZeroAddress(market.marketAddress),
  });

  return useContractWrite(config);
};

const handleMintRequest = (
  market: SyntheticMarketData,
  collateral: number,
  synt: number
): HandlerData => {
  const collateralBN = safeToBigNumber(collateral, market.collateralDecimals);

  const safeCollateral = collateralBN.gt(market.collateralBalance)
    ? market.collateralBalance
    : collateralBN;

  const syntBN = safeToBigNumber(synt);

  const functionName = 'request';
  const args = [
    [RequestActions.Deposit, RequestActions.Mint],
    [
      encodeData(market.account, safeCollateral),
      encodeData(market.account, syntBN),
    ],
  ];
  const enabled = !safeCollateral.isZero() && !syntBN.isZero();
  const overrides = {};
  const contractInterface = SyntheticMinterABI;

  return {
    functionName,
    args,
    contractInterface,
    overrides,
    enabled,
  };
};

const handleDepositCollateral = (
  market: SyntheticMarketData,
  collateral: number
): HandlerData => {
  const bnCollateral = safeToBigNumber(
    collateral,
    market.collateralDecimals,
    8
  );

  const safeCollateral = bnCollateral.gt(market.collateralBalance)
    ? market.collateralBalance
    : bnCollateral;

  const functionName = 'deposit';
  const args = [market.account, safeCollateral];
  const enabled = !safeCollateral.isZero();
  const overrides = {};
  const contractInterface = SyntheticMinterABI;

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

const handleMintSynt = (
  market: SyntheticMarketData,
  synt: number
): HandlerData => {
  const syntBN = safeToBigNumber(synt);

  const functionName = 'mint';
  const args = [market.account, syntBN];
  const enabled = !syntBN.isZero();
  const overrides = {};
  const contractInterface = SyntheticMinterABI;

  return {
    functionName,
    args,
    enabled,
    overrides,
    contractInterface,
  };
};

export const useMint = (
  market: SyntheticMarketData,
  collateral: string,
  synt: string
) => {
  const [safeCollateral] = useDebounce(
    isNaN(+collateral) ? 0 : +collateral,
    500
  );
  const [safeSynt] = useDebounce(isNaN(+synt) ? 0 : +synt, 500);

  let data = {} as HandlerData;

  if (!!safeCollateral && !!safeSynt)
    data = handleMintRequest(market, safeCollateral, safeSynt);

  if (safeCollateral && !safeSynt)
    data = handleDepositCollateral(market, safeCollateral);

  if (safeSynt && !safeCollateral) data = handleMintSynt(market, safeSynt);

  const { config } = usePrepareContractWrite({
    addressOrName: market.marketAddress,
    ...data,
    enabled:
      data.enabled &&
      !isEmpty(data) &&
      isValidAccount(market.account) &&
      !isZeroAddress(market.marketAddress),
  });

  return useContractWrite(config);
};

export const useGetRewards = (market: SyntheticMarketData) => {
  const { config } = usePrepareContractWrite({
    addressOrName: market.marketAddress,
    functionName: 'getRewards',
    contractInterface: SyntheticMinterABI,
    enabled:
      isValidAccount(market.account) &&
      !isZeroAddress(market.marketAddress) &&
      !market.pendingRewards.isZero(),
  });

  return useContractWrite(config);
};
