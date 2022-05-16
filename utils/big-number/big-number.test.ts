//import { BigNumber } from 'ethers';

import { BigNumber } from 'ethers';

import { fromPositiveNumber } from './index';

describe('Big Number', () => {
  it('should get the BigNumber with 10', () => {
    const BG = { _hex: '0x02540be400', _isBigNumber: true } as BigNumber;
    const positiveNumber = fromPositiveNumber(10, 1);

    expect(positiveNumber._hex).toEqual(BG._hex);
  });
});
