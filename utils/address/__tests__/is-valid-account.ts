import { ok } from 'assert';
import { ethers } from 'ethers';

import { isValidAccount } from '../index';

const ADRESSES = [
  '0x71bBD8fF7D6180BB933ca92DF2525563AAA2ee78',
  '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab',
  '0x71bBD8fF73AAA2Ee78',
  '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2',
];
describe(isValidAccount.name, () => {
  it('Should be passed because this a real address', () => {
    try {
      ethers.utils.getAddress(ADRESSES[0]);
      expect(isValidAccount(ADRESSES[0])).toBeTruthy();
    } catch {
      fail('Because this is a real address');
    }
  });

  it('Should be passed because this a fake address', () => {
    try {
      ethers.utils.getAddress(ADRESSES[2]);
      expect(isValidAccount(ADRESSES[2])).toBeFalsy();
    } catch {
      ok('Because this is a fake address');
    }
  });
});
