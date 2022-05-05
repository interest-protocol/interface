import { BigNumber } from 'ethers';

import { TOKEN_SYMBOL } from '../constants';
import { CurrencyAmount } from './currency-amount';
import { ERC20 } from './erc-20';
import { Pair } from './pair';

type Args = {
  allowance: BigNumber;
  balance: BigNumber;
  erc20: ERC20;
};

type Data = {
  currencyAmount: CurrencyAmount<ERC20>;
  allowance: BigNumber;
};

export class DineroMarketPair extends Pair<Data, Data> {
  constructor(collateralData: Args, dnrData: Args) {
    super(
      {
        currencyAmount: CurrencyAmount.fromRawAmount(
          collateralData.erc20,
          collateralData.balance
        ),
        allowance: collateralData.allowance,
      },
      {
        currencyAmount: CurrencyAmount.fromRawAmount(
          dnrData.erc20,
          dnrData.balance
        ),
        allowance: dnrData.allowance,
      }
    );
  }

  public getDineroCurrencyAmount(): CurrencyAmount<ERC20> {
    return this._second.currencyAmount;
  }

  public getCollateralCurrencyAmount(): CurrencyAmount<ERC20> {
    return this._first.currencyAmount;
  }

  public getDineroAllowance(): BigNumber {
    return this._second.allowance;
  }

  public getCollateralAllowance(): BigNumber {
    return this._first.allowance;
  }

  public getCollateral(): ERC20 {
    return this._first.currencyAmount.currency;
  }

  public getDinero(): ERC20 {
    return this._second.currencyAmount.currency;
  }

  public getDineroBalance(): BigNumber {
    return this._second.currencyAmount.numerator;
  }

  public getCollateralBalance(): BigNumber {
    return this._first.currencyAmount.numerator;
  }

  public getData(x: TOKEN_SYMBOL): Data {
    return this._first.currencyAmount.currency.symbol === x
      ? this._first
      : this._second;
  }
}
