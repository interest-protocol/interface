import { BigNumber } from 'ethers';

import { adjustTo18Decimals } from '..';

describe(adjustTo18Decimals.name, () => {
  it('adjust a big number to always have 18 decimals', () => {
    expect(adjustTo18Decimals(BigNumber.from('100'), 5).toString()).toEqual(
      '1000000000000000'
    );

    expect(
      adjustTo18Decimals(BigNumber.from('1000000000000000'), 23).toString()
    ).toEqual('10000000000');
  });
});
