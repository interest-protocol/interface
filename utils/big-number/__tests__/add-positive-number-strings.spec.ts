import { addPositiveNumberStrings } from '../index';

describe(addPositiveNumberStrings.name, () => {
  it('should be 44 with 18 zeros from sum of 11 and 33', () => {
    const positiveNumber = addPositiveNumberStrings(
      '11000000000000000000',
      '33000000000000000000'
    );
    expect(positiveNumber.toString()).toEqual('44000000000000000000');
  });
});
