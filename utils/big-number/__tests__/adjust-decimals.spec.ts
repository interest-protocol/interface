import { BigNumber } from 'ethers';

import { adjustDecimals } from '..';

describe(adjustDecimals.name, () => {
  it('adjust a big number to always have 18 decimals by default', () => {
    expect(adjustDecimals(BigNumber.from('100'), 5).toString()).toEqual(
      '1000000000000000'
    );

    expect(
      adjustDecimals(BigNumber.from('1000000000000000'), 23).toString()
    ).toEqual('10000000000');
  });
  it('adjust a big number to a custom decimal house', () => {
    expect(adjustDecimals(BigNumber.from('100'), 5, 5).toString()).toEqual(
      BigNumber.from('100').toString()
    );

    expect(
      adjustDecimals(BigNumber.from('1000000000000000'), 23, 17).toString()
    ).toEqual('1000000000');
  });
});
