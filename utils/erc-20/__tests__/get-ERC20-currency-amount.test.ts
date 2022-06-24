import { CHAIN_ID, CONTRACTS, CurrencyAmount, ERC20 } from '@/sdk';

import { getERC20CurrencyAmount } from '..';

describe(getERC20CurrencyAmount.name, () => {
  it('Should be a passed because get a real ERC20', () => {
    const result = getERC20CurrencyAmount(
      CHAIN_ID.BNB_TEST_NET,
      CONTRACTS.INT[CHAIN_ID.BNB_TEST_NET],
      '3000000000000000000'
    );
    expect(result).toBeInstanceOf(CurrencyAmount);
    expect(result.currency).toBeInstanceOf(ERC20);
    expect(result.numerator.toString()).toEqual('3000000000000000000');
  });
  it('Should be a passed because chain id is wrong', () => {
    expect(() =>
      getERC20CurrencyAmount(
        10,
        CONTRACTS.INT[CHAIN_ID.BNB_TEST_NET],
        '3000000000000000000'
      )
    ).toThrow(
      "Cannot read property '" +
        CONTRACTS.INT[CHAIN_ID.BNB_TEST_NET] +
        "' of undefined"
    );
  });
  it('Should be a passed because not an address', () => {
    expect(() =>
      getERC20CurrencyAmount(
        CHAIN_ID.BNB_TEST_NET,
        'not an address',
        '3000000000000000000'
      )
    ).toThrow(
      'invalid address (argument="address", value="not an address", code=INVALID_ARGUMENT, version=address/5.6.0)'
    );
  });
  it('Should be a passed because not a correct big number', () => {
    expect(() =>
      getERC20CurrencyAmount(
        CHAIN_ID.BNB_TEST_NET,
        CONTRACTS.INT[CHAIN_ID.BNB_TEST_NET],
        'not a bigNumber'
      )
    ).toThrow(
      'invalid BigNumber string (argument="value", value="not a bigNumber", code=INVALID_ARGUMENT, version=bignumber/5.6.0)'
    );
  });
});
