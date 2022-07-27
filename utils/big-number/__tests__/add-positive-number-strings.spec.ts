import { addPositiveNumberStrings } from '..';

describe(addPositiveNumberStrings.name, () => {
  it('should be 44 with 18 zeros from sum of 11 and 33', () => {
    const positiveNumber = addPositiveNumberStrings(
      '11000000000000000000',
      '33000000000000000000'
    );
    expect(positiveNumber.toString()).toEqual('44000000000000000000');
  });

  it('returns 0 if x and y are NaNs', () => {
    expect(addPositiveNumberStrings('world', '33000000000000000000')).toEqual(
      '0'
    );
    expect(addPositiveNumberStrings('33000000000000000000', 'hello')).toEqual(
      '0'
    );
  });

  it('returns 0 if x and y are lower than 0', () => {
    expect(
      addPositiveNumberStrings(
        (-Math.random()).toString(),
        '33000000000000000000'
      )
    ).toEqual('0');
    expect(
      addPositiveNumberStrings(
        '33000000000000000000',
        (-Math.random()).toString()
      )
    ).toEqual('0');
  });
});
