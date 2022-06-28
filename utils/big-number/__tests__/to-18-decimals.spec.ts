import { to18Decimals } from '../index';

describe(to18Decimals.name, () => {
  it('should be passed convert 10 to big number with 18 zeros', () => {
    const toDec = to18Decimals(10);
    expect(toDec.toString()).toEqual('10000000000000000000');
  });
});
