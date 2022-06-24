import { CHAIN_ID, CONTRACTS } from '@/sdk';
import { ERC20 } from '@/sdk/entities/erc-20';

import { getERC20Data } from '..';

describe(getERC20Data.name, () => {
  it('Should be a passed because get a real ERC20', () => {
    const result = getERC20Data(
      CHAIN_ID.BSC_TEST_NET,
      CONTRACTS.INT[CHAIN_ID.BSC_TEST_NET]
    );
    expect(result).toBeInstanceOf(ERC20);
    expect(result.address).toEqual(CONTRACTS.INT[CHAIN_ID.BSC_TEST_NET]);
    expect(result.name).toEqual('Interest Token');
  });
  it('Should be a passed because the CHAIN_ID is wrong', () => {
    expect(() =>
      getERC20Data(10, CONTRACTS.INT[CHAIN_ID.BSC_TEST_NET])
    ).toThrow(
      "Cannot read property '" +
        CONTRACTS.INT[CHAIN_ID.BSC_TEST_NET] +
        "' of undefined"
    );
  });
  it('Should be a passed because the address is wrong', () => {
    expect(() => getERC20Data(10, 'not an address')).toThrow(
      'invalid address (argument="address", value="not an address", code=INVALID_ARGUMENT, version=address/5.6.0)'
    );
  });
});
