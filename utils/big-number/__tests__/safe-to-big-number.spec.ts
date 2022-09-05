import { MAX_NUMBER_INPUT_VALUE } from '@/sdk';

import { safeToBigNumber } from '..';

const io = [
  [1, '1000000000000000000'],
  [1.1, '1100000000000000000'],
  [0.1, '100000000000000000'],
  [0.01, '10000000000000000'],
  [0.001, '1000000000000000'],
  [0.0001, '100000000000000'],
  [0.00001, '10000000000000'],
  [0.000001, '1000000000000'],
  [0.0000001, '0'],
  [0.0000000000001, '0'],
  [0.00000000000000001, '0'],
];

const makeSut = () => ({
  sut: (x: number | string, decimals?: number, significant?: number) =>
    safeToBigNumber(x, decimals, significant).toString(),
});

describe(safeToBigNumber.name, () => {
  it('should be convert 10 to big number with 18 zeros', () => {
    const { sut } = makeSut();

    expect(sut(10)).toEqual('10000000000000000000');
  });

  it('handles very large numbers', () => {
    const { sut } = makeSut();

    expect(sut(MAX_NUMBER_INPUT_VALUE)).toEqual('9000000000000000000000000000');
  });

  it('handles decimal houses', () => {
    const { sut } = makeSut();

    expect(sut(100.123456)).toEqual('100123456000000000000');

    expect(sut(100.1234567)).toEqual('100123456000000000000');

    expect(sut(100.1234567, 16, 2)).toEqual('1001200000000000000');
  });

  it.each(io)('should convert number %f to %s', (input, output) => {
    const { sut } = makeSut();

    expect(sut(input)).toBe(output);
  });
});
