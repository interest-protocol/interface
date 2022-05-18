import { isValidAccount } from '../index';
describe(isValidAccount.name, () => {
  it('Should be true because this a real address', () => {
    expect(
      isValidAccount('0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78')
    ).toEqual(true);
  });
});
