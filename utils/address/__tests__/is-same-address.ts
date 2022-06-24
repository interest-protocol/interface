import { CHAIN_ID, CONTRACTS } from '@/sdk';

import { isSameAddress } from '../index';

const addressFake = '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0aab';

describe(isSameAddress.name, () => {
  it('Should be passed because this function is case sensitive or one address doesnt exist', () => {
    expect(() =>
      isSameAddress(
        CONTRACTS.PCS_V2_PAIR_BTC_DNR[CHAIN_ID.BSC_TEST_NET],
        addressFake
      )
    ).toThrow(
      'bad address checksum (argument="address", value="' +
        addressFake +
        '", code=INVALID_ARGUMENT, version=address/5.6.0)'
    );
  });
  it('Should be passed because the address are equal', () => {
    expect(
      isSameAddress(
        CONTRACTS.DINERO_FAUCET[CHAIN_ID.BSC_TEST_NET],
        CONTRACTS.DINERO_FAUCET[CHAIN_ID.BSC_TEST_NET]
      )
    ).toBeTruthy();
  });
  it('Should be passed because the address are different', () => {
    expect(
      isSameAddress(
        CONTRACTS.DINERO_FAUCET[CHAIN_ID.BSC_TEST_NET],
        CONTRACTS.PCS_V2_PAIR_BTC_DNR[CHAIN_ID.BSC_TEST_NET]
      )
    ).toBeFalsy();
  });
  it('should throw because throw', () => {
    expect(() =>
      isSameAddress(
        'not an address',
        CONTRACTS.DINERO_FAUCET[CHAIN_ID.BSC_TEST_NET]
      )
    ).toThrow(
      'invalid address (argument="address", value="not an address", code=INVALID_ARGUMENT, version=address/5.6.0)'
    );
  });
});
