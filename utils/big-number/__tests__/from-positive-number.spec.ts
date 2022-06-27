import { MAX_NUMBER_INPUT_VALUE, ZERO_BIG_NUMBER } from '@/sdk';

import { fromPositiveNumber } from '..';

describe(fromPositiveNumber.name, () => {
  it('should be have a 18 zeros', () => {
    const positiveNumber = fromPositiveNumber(18)(10);
    expect(positiveNumber.toString()).toEqual('10000000000000000000');
  });

  it(`returns 0 if X is larger than ${MAX_NUMBER_INPUT_VALUE}`, () => {
    expect(fromPositiveNumber(MAX_NUMBER_INPUT_VALUE, 1)).toEqual(
      ZERO_BIG_NUMBER
    );
    expect(fromPositiveNumber(MAX_NUMBER_INPUT_VALUE + 1, 1)).toEqual(
      ZERO_BIG_NUMBER
    );
  });

  it('returns 0 if x is negative', () => {
    expect(fromPositiveNumber(-Math.random(), 1)).toEqual(ZERO_BIG_NUMBER);
  });

  it('returns 0 if y is negative', () => {
    expect(fromPositiveNumber(100, -Math.random())).toEqual(ZERO_BIG_NUMBER);
  });

  it('returns 0 if y is higher than 50', () => {
    expect(fromPositiveNumber(100, 51)).toEqual(ZERO_BIG_NUMBER);
  });
});
