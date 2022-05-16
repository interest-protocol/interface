import { isSameAddress } from './index';
describe('Address', () => {
  it('Should be a true because are different', () => {
    expect(
      isSameAddress(
        '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
        '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
      )
    ).toEqual(false);
  });
  it('Should be a true because are equal', () => {
    expect(
      isSameAddress(
        '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
        '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78'
      )
    ).toEqual(true);
  });
});
