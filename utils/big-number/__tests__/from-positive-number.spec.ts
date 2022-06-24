import { fromPositiveNumber } from '../index';

describe(fromPositiveNumber.name, () => {
  it('should be have a 18 zeros', () => {
    const positiveNumber = fromPositiveNumber(18)(10);
    expect(positiveNumber.toString()).toEqual('10000000000000000000');
  });
});
