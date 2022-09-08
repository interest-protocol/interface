import { FixedPointMath } from '@/sdk';

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
    FixedPointMath.toBigNumber(x, decimals, significant).toString(),
});
describe(FixedPointMath.toBigNumber.name, () => {
  it.each(io)('should convert number %f to %s', (input, output) => {
    const { sut } = makeSut();

    expect(sut(input)).toBe(output);
  });
});
