import { BigNumber, ethers } from 'ethers';
import { UseFormReturn } from 'react-hook-form';

import {
  DINERO_MARKET_DATA_CALL_MAP,
  DINERO_MARKET_METADATA,
  DineroMarketKind,
  FARM_METADATA_MAP,
  getDineroMarketSVGBySymbol,
  TOKENS_SVG_MAP,
  WBNB_INT_ADDRESS_MAP,
  WRAPPED_NATIVE_TOKEN,
} from '@/constants';
import {
  CHAIN_ID,
  IntMath,
  TOKEN_SYMBOL,
  ZERO_ADDRESS,
  ZERO_BIG_NUMBER,
} from '@/sdk';
import { Fraction } from '@/sdk/entities/fraction';
import { closeTo } from '@/sdk/utils';
import {
  calculateFarmBaseAPR,
  calculateFarmTokenPrice,
  calculateIntUSDPrice,
  formatDollars,
  formatMoney,
} from '@/utils';

import {
  GetSafeDineroMarketData,
  IBorrowForm,
  IBorrowFormField,
  TCalculateBorrowAmount,
  TCalculateDineroLeftToBorrow,
  TCalculateExpectedLiquidationPrice,
  TCalculateInterestAccrued,
  TCalculatePositionHealth,
  TCalculateUserCurrentLTV,
  TGetBorrowFields,
  TGetBorrowPositionHealthData,
  TGetInfoLoanData,
  TGetMyPositionData,
  TGetPositionHealthDataInternal,
  TGetRepayFields,
  TGetRepayPositionHealthData,
  TLoanElasticToPrincipal,
  TLoanPrincipalToElastic,
  TSafeAmountToWithdraw,
  TSafeAmountToWithdrawRepay,
} from './dinero-market.types';

export const isFormBorrowEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.borrow ||
  form.formState.errors.borrow?.['loan'] ||
  form.formState.errors.borrow?.['collateral'];

export const isFormRepayEmpty = (form: UseFormReturn<IBorrowForm>) =>
  form.formState.errors.repay ||
  form.formState.errors.repay?.['loan'] ||
  form.formState.errors.repay?.['collateral'];

const makeSymbol = (
  symbol0: string,
  symbol1: string,
  kind: DineroMarketKind
) => {
  if (kind === DineroMarketKind.LpFreeMarket) return `${symbol0}-${symbol1}`;

  return `${symbol0}`;
};

const DEFAULT_MARKET_DATA = {
  kind: DineroMarketKind.ERC20,
  loanBase: ZERO_BIG_NUMBER,
  loanElastic: ZERO_BIG_NUMBER,
  interestRate: ZERO_BIG_NUMBER,
  lastAccrued: ZERO_BIG_NUMBER,
  collateralUSDPrice: ZERO_BIG_NUMBER,
  liquidationFee: ZERO_BIG_NUMBER,
  ltv: ZERO_BIG_NUMBER,
  userCollateral: ZERO_BIG_NUMBER,
  userPrincipal: ZERO_BIG_NUMBER,
  collateralAllowance: ZERO_BIG_NUMBER,
  collateralBalance: ZERO_BIG_NUMBER,
  dnrBalance: ZERO_BIG_NUMBER,
  pendingRewards: ZERO_BIG_NUMBER,
  apr: IntMath.from(0),
  symbol0: '',
  symbol1: '',
  name: '',
  stable: false,
  marketAddress: ZERO_ADDRESS,
  collateralDecimals: 18,
  collateralAddress: ZERO_ADDRESS,
  intUSDPrice: ZERO_BIG_NUMBER,
  chainId: CHAIN_ID.BNB_TEST_NET,
};

export const getSafeDineroMarketData: GetSafeDineroMarketData = (
  chainId: number,
  market,
  data
) => {
  if (!chainId || !data) return DEFAULT_MARKET_DATA;

  const marketMetadata =
    DINERO_MARKET_METADATA[chainId][ethers.utils.getAddress(market)];

  const farmsMetadata = FARM_METADATA_MAP[chainId];

  const wrappedNativeToken = WRAPPED_NATIVE_TOKEN[chainId];

  const baseToken = DINERO_MARKET_DATA_CALL_MAP[chainId][market].baseToken;

  if (!marketMetadata || !farmsMetadata || !wrappedNativeToken)
    return DEFAULT_MARKET_DATA;

  if (marketMetadata.kind !== DineroMarketKind.LpFreeMarket)
    return {
      loanBase: data.marketData.loanBase,
      loanElastic: data.marketData.loanElastic,
      interestRate: data.marketData.interestRate,
      lastAccrued: data.marketData.lastAccrued,
      collateralUSDPrice: data.marketData.collateralUSDPrice,
      liquidationFee: data.marketData.liquidationFee,
      ltv: data.marketData.LTV,
      userCollateral: data.marketData.userCollateral,
      userPrincipal: data.marketData.userPrincipal,
      collateralAllowance: data.marketData.collateralAllowance,
      collateralBalance: data.marketData.collateraBalance,
      dnrBalance: data.marketData.dnrBalance,
      pendingRewards: ZERO_BIG_NUMBER,
      apr: IntMath.from(0),
      intUSDPrice: ZERO_BIG_NUMBER,
      marketAddress: market,
      chainId,
      ...marketMetadata,
    };

  const nativeIntPoolMetadata = farmsMetadata[WBNB_INT_ADDRESS_MAP[chainId]];

  const tokenPriceMap = {
    [wrappedNativeToken.address]: data.nativeUSDPrice,
    [baseToken]: data.baseTokenUSDPrice,
  };

  const intUSDPrice = calculateIntUSDPrice(
    chainId,
    nativeIntPoolMetadata.token0,
    nativeIntPoolMetadata.token1,
    data.ipxPoolData.reserve0,
    data.ipxPoolData.reserve1,
    tokenPriceMap
  );

  const collateralPoolMetadata =
    farmsMetadata[
      ethers.utils.getAddress(data.collateralPoolData.stakingToken)
    ];

  const stakeTokenUSDPrice = calculateFarmTokenPrice(
    chainId,
    collateralPoolMetadata.token0,
    collateralPoolMetadata.token1,
    data.collateralPoolData.reserve0,
    data.collateralPoolData.reserve1,
    tokenPriceMap,
    data.collateralPoolData.totalStakingAmount
  );

  return {
    loanBase: data.marketData.loanBase,
    loanElastic: data.marketData.loanElastic,
    interestRate: data.marketData.interestRate,
    lastAccrued: data.marketData.lastAccrued,
    collateralUSDPrice: data.marketData.collateralUSDPrice,
    liquidationFee: data.marketData.liquidationFee,
    ltv: data.marketData.LTV,
    userCollateral: data.marketData.userCollateral,
    userPrincipal: data.marketData.userPrincipal,
    collateralAllowance: data.marketData.collateralAllowance,
    collateralBalance: data.marketData.collateraBalance,
    dnrBalance: data.marketData.dnrBalance,
    pendingRewards: data.marketData.pendingRewards,
    marketAddress: market,
    intUSDPrice,
    chainId,
    apr: calculateFarmBaseAPR(
      chainId,
      data.mintData.totalAllocationPoints,
      data.collateralPoolData.allocationPoints,
      data.mintData.interestPerBlock,
      intUSDPrice,
      data.collateralPoolData.totalStakingAmount,
      stakeTokenUSDPrice.value()
    ),
    ...marketMetadata,
  };
};

export const calculateInterestAccrued: TCalculateInterestAccrued = (
  elastic,
  lastAccrued,
  interestRate
) => {
  const lasAccrued = IntMath.toNumber(lastAccrued) * 1000;

  const now = new Date().getTime();

  const timeDelta = now - lasAccrued;

  return IntMath.from(elastic.mul(interestRate))
    .mul(timeDelta)
    .value()
    .div(1000);
};

export const loanPrincipalToElastic: TLoanPrincipalToElastic = (
  loanBase,
  userPrincipal,
  lastAccrued,
  loanElastic,
  interestRate
): IntMath => {
  if (loanBase.isZero()) return IntMath.from(ZERO_BIG_NUMBER);

  const interestAccrued = calculateInterestAccrued(
    loanElastic,
    lastAccrued,
    interestRate
  );
  return IntMath.from(userPrincipal)
    .mul(loanElastic.add(interestAccrued))
    .div(loanBase);
};

export const loanElasticToPrincipal: TLoanElasticToPrincipal = (
  loanBase,
  lastAccrued,
  loanElastic,
  interestRate
): IntMath => {
  if (loanBase.isZero()) return IntMath.from(ZERO_BIG_NUMBER);
  return IntMath.from(loanElastic)
    .mul(interestRate)
    .div(
      loanElastic.add(
        calculateInterestAccrued(loanElastic, lastAccrued, interestRate)
      )
    );
};

export const calculateExpectedLiquidationPrice: TCalculateExpectedLiquidationPrice =
  (
    {
      ltv,
      userCollateral,
      loanBase,
      userPrincipal,
      lastAccrued,
      loanElastic,
      interestRate,
    },
    additionalCollateral,
    additionalPrincipal
  ): IntMath => {
    const collateral = userCollateral.add(additionalCollateral);

    if (collateral.isZero()) return IntMath.from(0);
    const userElasticLoan = loanPrincipalToElastic(
      loanBase,
      userPrincipal,
      lastAccrued,
      loanElastic.add(additionalPrincipal),
      interestRate
    );

    return userElasticLoan.div(IntMath.from(ltv).mul(collateral));
  };

export const calculatePositionHealth: TCalculatePositionHealth = ({
  ltv,
  loanBase,
  userPrincipal,
  userCollateral,
  loanElastic,
  collateralUSDPrice,
  lastAccrued,
  interestRate,
}): IntMath => {
  if (loanElastic.isZero() || userCollateral.isZero()) return IntMath.from(0);

  const userElasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  );

  return userElasticLoan.div(
    IntMath.from(userCollateral).mul(collateralUSDPrice).mul(ltv)
  );
};

export const calculateDineroLeftToBorrow: TCalculateDineroLeftToBorrow = ({
  ltv,
  userCollateral,
  loanBase,
  userPrincipal,
  lastAccrued,
  loanElastic,
  interestRate,
  collateralUSDPrice,
}): IntMath => {
  const userElasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  );

  const collateral = IntMath.from(ltv)
    .mul(userCollateral)
    .mul(collateralUSDPrice);
  return collateral.sub(userElasticLoan);
};

export const safeAmountToWithdrawRepay: TSafeAmountToWithdrawRepay = (
  {
    ltv,
    userCollateral,
    collateralUSDPrice,
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic: elastic,
    interestRate,
  },
  repayLoan
) => {
  if (elastic.isZero()) return IntMath.from(userCollateral);

  const loanElastic = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    elastic,
    interestRate
  );

  if (repayLoan.gte(loanElastic.value())) return IntMath.from(userCollateral);

  const userNeededCollateralInUSD = loanElastic.div(ltv);

  const collateralInUSD = IntMath.from(userCollateral).mul(collateralUSDPrice);

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(collateralUSDPrice);

  return amount.mul(ethers.utils.parseEther('0.95'));
};

export const safeAmountToWithdraw: TSafeAmountToWithdraw = ({
  ltv,
  loanBase,
  lastAccrued,
  loanElastic,
  interestRate,
  userPrincipal,
  userCollateral,
  collateralUSDPrice,
}) => {
  if (loanElastic.isZero()) return IntMath.from(userCollateral);

  const userNeededCollateralInUSD = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  ).div(ltv);

  const collateralInUSD = IntMath.from(userCollateral).mul(collateralUSDPrice);

  const amount = userNeededCollateralInUSD.gte(collateralInUSD)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralInUSD.sub(userNeededCollateralInUSD).div(collateralUSDPrice);

  return closeTo(
    amount.value(),
    userCollateral,
    ethers.utils.parseEther('0.001')
  )
    ? amount
    : amount.mul(ethers.utils.parseEther('0.95'));
};

export const calculateBorrowAmount: TCalculateBorrowAmount = ({
  ltv,
  loanBase,
  lastAccrued,
  loanElastic,
  interestRate,
  userPrincipal,
  userCollateral,
  collateralUSDPrice,
}) => {
  const userElasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  );

  const collateralValue = IntMath.from(userCollateral)
    .mul(collateralUSDPrice)
    .mul(ltv);

  return userElasticLoan.gte(collateralValue)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : collateralValue.sub(userElasticLoan);
};

const getPositionHealthDataInternal: TGetPositionHealthDataInternal = (
  newBorrowAmount,
  newCollateral,
  market
) => {
  const expectedLiquidationPrice = newBorrowAmount.gte(
    IntMath.from(newCollateral)
      .mul(market.collateralUSDPrice)
      .mul(market.ltv)
      .value()
  )
    ? IntMath.from(market.collateralUSDPrice)
    : calculateExpectedLiquidationPrice(market, newCollateral, newBorrowAmount);

  const positionHealth = newBorrowAmount.isZero()
    ? ZERO_BIG_NUMBER
    : calculatePositionHealth({
        ...market,
        userCollateral: newCollateral,
        loanElastic: loanPrincipalToElastic(
          market.loanBase,
          market.userPrincipal,
          market.lastAccrued,
          market.loanElastic,
          market.interestRate
        ).value(),
      }).value();

  const roundPositionHealthNumber = Math.trunc(
    Math.ceil((1 - IntMath.toNumber(positionHealth)) * 100)
  );

  return [
    // TODO: replace this magic number with Real Max Value
    formatMoney(734956),
    roundPositionHealthNumber === 100
      ? '0'
      : Fraction.from(
          newBorrowAmount,
          ethers.utils.parseEther('1')
        ).toSignificant(4),
    `$${formatMoney(
      Math.floor(
        +Fraction.from(
          expectedLiquidationPrice.value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )
    )}`,
    `${roundPositionHealthNumber} %`,
  ];
};

export const getRepayPositionHealthData: TGetRepayPositionHealthData = (
  market,
  { collateral, loan }
) => {
  if (!market) return ['0', '0', '0', '0'];

  const repay = IntMath.from(IntMath.toBigNumber(loan));

  const elasticLoan = loanPrincipalToElastic(
    market.loanBase,
    market.userPrincipal,
    market.lastAccrued,
    market.loanElastic,
    market.interestRate
  );

  const newElasticLoan = repay.gte(elasticLoan)
    ? IntMath.from(ZERO_BIG_NUMBER)
    : elasticLoan.sub(repay);

  const newCollateral = market.userCollateral.sub(
    IntMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(
    newElasticLoan.value(),
    newCollateral,
    market
  );
};

export const getBorrowPositionHealthData: TGetBorrowPositionHealthData = (
  market,
  { collateral, loan }
) => {
  if (!market) return ['0', '0', '0', '0'];

  const newBorrowAmount = loanPrincipalToElastic(
    market.loanBase,
    market.userPrincipal,
    market.lastAccrued,
    market.loanElastic,
    market.interestRate
  )
    .add(IntMath.toBigNumber(loan))
    .value();

  const newCollateral = market.userCollateral.add(
    IntMath.toBigNumber(collateral)
  );

  return getPositionHealthDataInternal(newBorrowAmount, newCollateral, market);
};

export const getLoanInfoData: TGetInfoLoanData = (market, kind) => {
  if (!market && kind === DineroMarketKind.LpFreeMarket)
    return ['0%', '0%', '0%', '0%', '0', '0'];

  if (!market) return ['0%', '0%', '0%'];

  const ltv = IntMath.from(market.ltv).toPercentage();
  const liquidationFee = IntMath.from(market.liquidationFee).toPercentage();

  if (market.kind === DineroMarketKind.LpFreeMarket)
    return [
      ltv,
      liquidationFee,
      'N/A',
      market.apr.toPercentage(),
      formatMoney(IntMath.from(market.pendingRewards).toNumber()),
      formatDollars(
        IntMath.from(market.pendingRewards).mul(market.intUSDPrice).toNumber()
      ),
    ];

  return [
    ltv,
    liquidationFee,
    IntMath.from(market.interestRate).toPercentage(),
  ];
};

export const getMyPositionData: TGetMyPositionData = (market) => {
  {
    if (!market || !market) return ['0', '$0', '0', '$0', '0', '0'];

    const liquidationPrice = formatMoney(
      +Fraction.from(
        calculateExpectedLiquidationPrice(
          market,
          ZERO_BIG_NUMBER,
          ZERO_BIG_NUMBER
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)
    );

    const symbol = makeSymbol(market.symbol0, market.symbol1, market.kind);

    return [
      `${formatMoney(
        IntMath.from(market.userCollateral).toNumber(market.collateralDecimals)
      )} ${symbol}`,
      `$${formatMoney(
        +Fraction.from(
          IntMath.from(market.userCollateral)
            .mul(market.collateralUSDPrice)
            .value(),
          BigNumber.from(10).pow(market.collateralDecimals)
        ).toSignificant(4)
      )}`,
      `${formatMoney(
        +Fraction.from(
          loanPrincipalToElastic(
            market.loanBase,
            market.userPrincipal,
            market.lastAccrued,
            market.loanElastic,
            market.interestRate
          ).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(8)
      )} DNR`,
      `$${liquidationPrice} (${symbol}) `,
      `${formatMoney(
        +Fraction.from(
          calculateDineroLeftToBorrow(market).value(),
          ethers.utils.parseEther('1')
        ).toSignificant(4)
      )}`,
      `${Fraction.from(
        safeAmountToWithdraw(market).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(4)} ${symbol}`,
    ];
  }
};

export const convertCollateralToDinero = (
  collateralAmount: BigNumber,
  ltv: BigNumber,
  collateralUSDPrice: BigNumber
): BigNumber =>
  IntMath.from(collateralAmount).mul(ltv).mul(collateralUSDPrice).value();

export const calculateUserCurrentLTV: TCalculateUserCurrentLTV = (
  {
    loanElastic,
    userCollateral,
    loanBase,
    userPrincipal,
    lastAccrued,
    interestRate,
    collateralUSDPrice,
  },
  borrowCollateral,
  borrowLoan
) => {
  const collateralInUSD = IntMath.from(
    userCollateral.add(borrowCollateral)
  ).mul(collateralUSDPrice);

  const elasticLoan = loanPrincipalToElastic(
    loanBase,
    userPrincipal,
    lastAccrued,
    loanElastic,
    interestRate
  ).add(borrowLoan);

  return elasticLoan.div(collateralInUSD);
};

export const getBorrowFields: TGetBorrowFields = (market) => {
  if (!market) return [];

  return [
    {
      currency:
        market.kind === DineroMarketKind.LpFreeMarket ? 'LP' : market.name,
      amount: '0',
      currencyIcons: getDineroMarketSVGBySymbol(market.symbol0, market.symbol1),
      max: Math.floor(
        IntMath.toNumber(market.collateralBalance, market.collateralDecimals)
      ),
      name: 'borrow.collateral',
      label: 'Deposit Collateral',
      amountUSD: market.collateralUSDPrice.isZero()
        ? 0
        : IntMath.toNumber(market.collateralUSDPrice),
      disabled: market.collateralBalance.isZero(),
    },
    {
      max: calculateBorrowAmount(market).toNumber(),
      amount: '0',
      amountUSD: 1,
      currencyIcons: [
        {
          SVG: TOKENS_SVG_MAP[TOKEN_SYMBOL.DNR],
          highZIndex: false,
        },
      ],
      name: 'borrow.loan',
      label: 'Borrow Dinero',
      currency: TOKEN_SYMBOL.DNR,
      disabled:
        market.collateralBalance.isZero() && market.userCollateral.isZero(),
    },
  ];
};

export const getRepayFields: TGetRepayFields = (market) => {
  if (!market) return [];

  return [
    {
      amount: '0',
      amountUSD: 1,
      currencyIcons: [
        {
          SVG: TOKENS_SVG_MAP[TOKEN_SYMBOL.DNR],
          highZIndex: false,
        },
      ],
      name: 'repay.loan',
      label: 'Repay Dinero',
      max: IntMath.toNumber(market.dnrBalance),
      currency: TOKEN_SYMBOL.DNR,
      disabled: market.loanElastic.isZero() || market.dnrBalance.isZero(),
    },
    {
      currency:
        market.kind === DineroMarketKind.LpFreeMarket ? 'LP' : market.name,
      amount: '0',
      currencyIcons: getDineroMarketSVGBySymbol(market.symbol0, market.symbol1),
      max: safeAmountToWithdraw(market).toNumber(),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: market?.collateralUSDPrice.isZero()
        ? 0
        : IntMath.toNumber(market.collateralUSDPrice),
      disabled: market.userCollateral.isZero(),
    },
  ] as ReadonlyArray<IBorrowFormField>;
};
