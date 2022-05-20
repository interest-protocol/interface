import { ethers } from 'ethers';

import { CHAIN_ID } from '@/sdk';
import { ERC20 } from '@/sdk/entities/erc-20';

import { getERC20Data } from '..';

describe(getERC20Data.name, () => {
  it('Should be a passed because get a real ERC20', () => {
    const address = '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2';
    let result;
    try {
      ethers.utils.getAddress(address);
      result = getERC20Data(CHAIN_ID.BSC_TEST_NET, address);
      expect(result).toBeInstanceOf(ERC20);
      expect(result.address).toEqual(address);
      expect(result.name).toEqual('Interest Token');
    } catch (error) {
      console.log(error);
      fail('Something didnt curring when expected please review your test');
    }
  });
});
