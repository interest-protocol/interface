import { WrapperBuilder } from '@redstone-finance/evm-connector';
import { ethers } from 'ethers';
import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import { WrapperBuilder as OldWrapperBuilder } from 'redstone-evm-connector';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite, useQuery } from 'wagmi';

import {
  DEFAULT_ACCOUNT,
  REDSTONE_CORE_CONSUMER_DATA,
  SyntheticOracleType,
  SyntheticRequestActions,
} from '@/constants';
import { useIdAccount, useSafeContractRead } from '@/hooks';
import { HandlerData } from '@/interface';
import { FixedPointMath, ZERO_ADDRESS } from '@/sdk';
import GetTokenUsdPriceABI from '@/sdk/abi/get-token-usd-price.abi.json';
import InterestViewDineroV2ABI from '@/sdk/abi/interest-view-dinero-v2.abi.json';
import SyntheticMinterABI from '@/sdk/abi/synthetics-minter.abi.json';
import {
  getInterestViewDineroV2Address,
  getStaticWeb3Provider,
  isValidAccount,
  isZeroAddress,
  safeToBigNumber,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import {
  GetTokenUsdPriceAbi,
  InterestViewDineroV2Abi,
} from '../../../../types/ethers-contracts';
import {
  SyntheticMarketData,
  UseSynthsPanelHookArgs,
  UseWagmiGetSyntheticUserMarketDataArgs,
} from './synthetics-market-panel.types';
import {
  getMyPositionData,
  getRewardsInfo,
  processSyntheticData,
} from './synthetics-market-panel.utils';

export const useWagmiGetSyntheticUserMarketData = ({
  marketAddress,
  chainId,
  account,
  oracleType,
  dataFeedId,
  collateralAddress,
}: UseWagmiGetSyntheticUserMarketDataArgs) => {
  const areAddressesValid =
    ethers.utils.isAddress(marketAddress) &&
    ethers.utils.isAddress(collateralAddress);

  return useSafeContractRead({
    addressOrName: getInterestViewDineroV2Address(chainId),
    contractInterface: InterestViewDineroV2ABI,
    functionName: 'getSyntheticUserMarketData',
    args: [
      account || DEFAULT_ACCOUNT,
      marketAddress,
      collateralAddress,
      oracleType,
      ethers.utils.formatBytes32String(dataFeedId),
    ],
    enabled:
      areAddressesValid &&
      !!chainId &&
      oracleType === SyntheticOracleType.ChainLink &&
      dataFeedId === '',
    onError: () =>
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Read,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'getSyntheticUserMarketData',
      }),
    onSuccess: () =>
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Read,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'getSyntheticUserMarketData',
      }),
  });
};

const { defaultAbiCoder } = ethers.utils;

const encodeData = (to: string, amount: ethers.BigNumber) =>
  defaultAbiCoder.encode(['address', 'uint256'], [to || ZERO_ADDRESS, amount]);

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
    [SyntheticRequestActions.Burn, SyntheticRequestActions.Withdraw],
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
    [SyntheticRequestActions.Deposit, SyntheticRequestActions.Mint],
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

export const useRedstoneSynthsPanel = ({
  address,
  oracleType,
  dataFeedId,
  collateralAddress,
}: UseSynthsPanelHookArgs) => {
  const { chainId, account } = useIdAccount();

  const areAddressesValid =
    ethers.utils.isAddress(address) &&
    ethers.utils.isAddress(collateralAddress);

  const dineroContract = new ethers.Contract(
    getInterestViewDineroV2Address(chainId),
    InterestViewDineroV2ABI,
    getStaticWeb3Provider(chainId)
  );

  const redStoneData = REDSTONE_CORE_CONSUMER_DATA[chainId];

  const viewContract =
    oracleType === SyntheticOracleType.RedStoneConsumer
      ? (WrapperBuilder.wrap(
          dineroContract.connect(account || DEFAULT_ACCOUNT)
        ).usingDataService(
          {
            dataServiceId: redStoneData.dataServiceId,
            uniqueSignersCount: redStoneData.uniqueSignersCount,
            dataFeeds: [dataFeedId],
          },
          [redStoneData.url]
        ) as InterestViewDineroV2Abi)
      : (dineroContract as InterestViewDineroV2Abi);

  const queryFn = async () => {
    if (oracleType === SyntheticOracleType.RedStoneConsumer) {
      return viewContract.getSyntheticUserMarketData(
        account || DEFAULT_ACCOUNT,
        address,
        collateralAddress,
        oracleType,
        ethers.utils.formatBytes32String(dataFeedId)
      );
    }

    const marketData = await viewContract.getSyntheticUserMarketData(
      account || DEFAULT_ACCOUNT,
      address,
      collateralAddress,
      oracleType,
      ethers.utils.formatBytes32String('')
    );

    const marketContract = OldWrapperBuilder.wrapLite(
      new ethers.Contract(
        address,
        GetTokenUsdPriceABI,
        getStaticWeb3Provider(chainId)
      ).connect(account || DEFAULT_ACCOUNT)
    ).usingPriceFeed('redstone-custom-urls-demo', {
      asset: dataFeedId,
    }) as GetTokenUsdPriceAbi;

    const syntheticUSDPrice = await marketContract.getTokenUSDPrice();

    return {
      ...marketData,
      syntheticUSDPrice,
    };
  };

  const { error, data, refetch } = useQuery(
    [
      {
        entity: 'getSyntheticUserMarketData-red-stone',
        chainId,
        account,
        address,
        dataFeedId,
        collateralAddress,
      },
    ],
    queryFn,
    {
      enabled:
        areAddressesValid &&
        !!chainId &&
        oracleType !== SyntheticOracleType.ChainLink &&
        !!dataFeedId,
      onError: () =>
        logTransactionEvent({
          status: GAStatus.Error,
          type: GAType.Read,
          page: GAPage.SyntheticsMarketPanel,
          functionName: 'getSyntheticUserMarketData-red-stone',
        }),
      onSuccess: () =>
        logTransactionEvent({
          status: GAStatus.Success,
          type: GAType.Read,
          page: GAPage.SyntheticsMarketPanel,
          functionName: 'getSyntheticUserMarketData-red-stone',
        }),
    }
  );

  const market = useMemo(
    () => processSyntheticData(chainId, account, address, data),
    [chainId, address, data, account]
  );

  const rewardsInfo = getRewardsInfo(market);
  const myPositionData = getMyPositionData(market);

  return {
    error,
    rewardsInfo,
    myPositionData,
    refetch,
    market,
  };
};

export const useWagmiSynthsPanel = ({
  address,
  oracleType,
  dataFeedId,
  collateralAddress,
}: UseSynthsPanelHookArgs) => {
  const { chainId, account } = useIdAccount();

  const { error, data, refetch } = useWagmiGetSyntheticUserMarketData({
    marketAddress: address,
    chainId,
    account,
    collateralAddress,
    dataFeedId,
    oracleType,
  });

  const market = useMemo(
    () => processSyntheticData(chainId, account, address, data),
    [chainId, address, data, account]
  );

  const rewardsInfo = getRewardsInfo(market);
  const myPositionData = getMyPositionData(market);

  return {
    error,
    rewardsInfo,
    myPositionData,
    refetch,
    market,
  };
};
