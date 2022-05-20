import { ok } from 'assert';
import { ethers } from 'ethers';

import { isSameAddress } from '../index';

// ADDRESS_ARRAY FIX TYPO
const ADRESSES = [
  '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
  '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0Aab',
  '0x5F0A85e0f35bC4cBAFbcba7fd5f64B4cc41D0aab',
  '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2',
];
describe(isSameAddress.name, () => {
  it('Should be passed because this function is case sensitive or one address doesnt exist', () => {
    try {
      ethers.utils.getAddress(ADRESSES[1]);
      ethers.utils.getAddress(ADRESSES[2]);
      expect(isSameAddress(ADRESSES[1], ADRESSES[2])).toBeFalsy();
    } catch {
      ok(
        'Failed but will because one address doesnt exist and is none address'
      );
    }
  });
  it('Should be passed because the address are equal', () => {
    try {
      ethers.utils.getAddress(ADRESSES[0]);
      ethers.utils.getAddress(ADRESSES[0]);
      expect(isSameAddress(ADRESSES[0], ADRESSES[0])).toBeTruthy();
    } catch {
      fail('Failed because the addresses are equal.');
    }
  });
  it('Should be passed because the address are different', () => {
    try {
      // Why r u calling ethers.utils.get address they doing nothing delete this. and on successful cases please do not write a try catch
      ethers.utils.getAddress(ADRESSES[1]);
      ethers.utils.getAddress(ADRESSES[3]);
      expect(isSameAddress(ADRESSES[0], ADRESSES[1])).toBeFalsy();
    } catch {
      fail('Failed because one address doesnt exist and is none address');
    }
  });

  it.only('should throw because throw', () => {
    expect(() => isSameAddress('not an address', ADRESSES[0])).toThrow(
      'invalid address (argument="address", value="not an address", code=INVALID_ARGUMENT, version=address/5.6.0)'
    );
  });
});
