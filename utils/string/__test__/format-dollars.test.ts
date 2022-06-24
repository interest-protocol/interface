import { formatDollars } from '..';

const makeSut = () => ({
  sut: formatDollars,
});

describe(formatDollars.name, () => {
  it('should format 1000000000000 to $1,000.00 B', () => {
    const { sut } = makeSut();
    expect(sut(1000000000000)).toBe('$1,000.00 B');
  });
  it('should format 100000000000 to $100.00 B', () => {
    const { sut } = makeSut();
    expect(sut(100000000000)).toBe('$100.00 B');
  });
  it('should format 1000000000 to $100.00 B', () => {
    const { sut } = makeSut();
    expect(sut(1010000000)).toBe('$1.00 B');
  });
  it('should format 100000000 to $100.00 M', () => {
    const { sut } = makeSut();
    expect(sut(100000000)).toBe('$100.00 M');
  });
  it('should format 100000 to $100,000.00', () => {
    const { sut } = makeSut();
    expect(sut(100000)).toBe('$100,000.00');
  });
  it('should format 10000 to $10,000.00', () => {
    const { sut } = makeSut();
    expect(sut(10000)).toBe('$10,000.00');
  });
  it('should format 1000 to $1,000.00', () => {
    const { sut } = makeSut();
    expect(sut(1000)).toBe('$1,000.00');
  });
  it('should format 0.1 to $0.100', () => {
    const { sut } = makeSut();
    expect(sut(0.1)).toBe('$0.100');
  });
  it('should format 0.01 to $0.0100', () => {
    const { sut } = makeSut();
    expect(sut(0.01)).toBe('$0.0100');
  });
});
