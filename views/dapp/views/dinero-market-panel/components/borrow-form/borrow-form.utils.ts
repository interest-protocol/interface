import { TOKENS_SVG_MAP } from '@/constants';
import { TypeSVG } from '@/interface';
import { IntMath, TOKEN_SYMBOL } from '@/sdk';

import {
  calculateBorrowAmount,
  safeAmountToWithdraw,
} from '../../dinero-market.utils';
import {
  IBorrowFormField,
  TGetBorrowFields,
  TGetRepayFields,
} from './borrow-form.types';

export const getBorrowFields: TGetBorrowFields = (market, symbols) => {
  if (!market) return [];

  return [
    {
      currency: `${market.symbol0}${
        !!market.symbol1 && market.symbol1 != TOKEN_SYMBOL.Unknown
          ? `-${market.symbol1}`
          : ''
      }`,
      amount: '0',
      currencyIcons: symbols.map((symbol) =>
        symbol && symbol !== TOKEN_SYMBOL.Unknown
          ? TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown]
          : null
      ) as [TypeSVG, TypeSVG | null],
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
      currencyIcons: [TOKENS_SVG_MAP[TOKEN_SYMBOL.DNR], null] as [
        TypeSVG,
        TypeSVG | null
      ],
      name: 'borrow.loan',
      label: 'Borrow Dinero',
      currency: TOKEN_SYMBOL.DNR,
      disabled:
        market.collateralBalance.isZero() && market.userCollateral.isZero(),
    },
  ];
};

export const getRepayFields: TGetRepayFields = (market, symbols) => {
  if (!market) return [];

  return [
    {
      amount: '0',
      amountUSD: 1,
      currencyIcons: [TOKENS_SVG_MAP[market.symbol0], null] as [
        TypeSVG,
        TypeSVG | null
      ],
      name: 'repay.loan',
      label: 'Repay Dinero',
      max: IntMath.toNumber(market.dnrBalance),
      currency: TOKEN_SYMBOL.DNR,
      disabled: market.loanElastic.isZero() || market.dnrBalance.isZero(),
    },
    {
      currency: `${market.symbol0}${
        market.symbol1 && market.symbol1 != TOKEN_SYMBOL.Unknown
          ? `-${market.symbol1}`
          : ''
      }`,
      amount: '0',
      currencyIcons: symbols.map((symbol) =>
        symbol && symbol !== TOKEN_SYMBOL.Unknown
          ? TOKENS_SVG_MAP[symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown]
          : null
      ) as [TypeSVG, TypeSVG | null],
      max: safeAmountToWithdraw(market).toNumber(),
      name: 'repay.collateral',
      label: 'Remove Collateral',
      amountUSD: market?.collateralUSDPrice.isZero()
        ? 0
        : IntMath.toNumber(market.collateralUSDPrice) || 0,
      disabled: market.userCollateral.isZero(),
    },
  ] as ReadonlyArray<IBorrowFormField>;
};
