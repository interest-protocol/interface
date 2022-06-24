import { safeToBigNumber } from '../index';

describe(safeToBigNumber.name, () => {
  it('should be convert 10 to big number with 18 zeros', () => {
    const positiveNumber = safeToBigNumber(10);
    expect(positiveNumber.toString()).toEqual('10000000000000000000');
  });
});
