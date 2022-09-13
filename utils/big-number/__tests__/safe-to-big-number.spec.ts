import { MAX_NUMBER_INPUT_VALUE } from '@/sdk';

import { safeToBigNumber } from '..';

describe(safeToBigNumber.name, () => {
  it('should be convert 10 to big number with 18 zeros', () => {
    const positiveNumber = safeToBigNumber(10);
    expect(positiveNumber.toString()).toEqual('10000000000000000000');
  });

  it('handles very large numbers', () => {
    expect(safeToBigNumber(MAX_NUMBER_INPUT_VALUE).toString()).toEqual(
      '9000000000000000000000000000'
    );
  });

  it('handles decimal houses', () => {
    expect(safeToBigNumber(100.123456).toString()).toEqual(
      '100123456000000000000'
    );

    expect(safeToBigNumber(100.1234567).toString()).toEqual(
      '100123456000000000000'
    );

    expect(safeToBigNumber(100.1234567, 16, 2).toString()).toEqual(
      '1001200000000000000'
    );
  });
});
