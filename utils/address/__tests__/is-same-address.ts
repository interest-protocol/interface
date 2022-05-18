import { isSameAddress } from '../index';
describe(isSameAddress.name, () => {
  it('Should be false because the both address are different', () => {
    expect(
      isSameAddress(
        '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
        '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab'
      )
    ).toEqual(false);
  });
  it('Should be a true because the address are equal', () => {
    expect(
      isSameAddress(
        '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
        '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78'
      )
    ).toEqual(true);
  });
});
