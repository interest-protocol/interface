import { CHAIN_ID, CONTRACTS } from '@/sdk';

import { isValidAccount } from '../index';

describe(isValidAccount.name, () => {
  it('Should be passed because this a real address', () => {
    expect(
      isValidAccount(CONTRACTS.DINERO_FAUCET[CHAIN_ID.BNB_TEST_NET])
    ).toBeTruthy();
  });
  it('should throw because throw', () => {
    expect(() => isValidAccount('not an address')).toThrow(
      'invalid address (argument="address", value="not an address", code=INVALID_ARGUMENT, version=address/5.6.0)'
    );
  });
});
