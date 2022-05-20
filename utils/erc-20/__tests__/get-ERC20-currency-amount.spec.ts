import { ethers } from 'ethers';

import { CHAIN_ID, CurrencyAmount, ERC20 } from '@/sdk';

import { getERC20CurrencyAmount, getERC20Data } from '..';

describe(getERC20CurrencyAmount.name, () => {
  it('Should be a passed because get a real ERC20', () => {
    const address = '0x0D7747F1686d67824dc5a299AAc09F438dD6aef2';
    let resultERC20, resultCA;
    try {
      ethers.utils.getAddress(address);
      resultERC20 = getERC20Data(CHAIN_ID.BSC_TEST_NET, address);
      expect(resultERC20).toBeInstanceOf(ERC20);
      resultCA = getERC20CurrencyAmount(
        CHAIN_ID.BSC_TEST_NET,
        address,
        '3000000000000000000'
      );
      expect(resultCA).toBeInstanceOf(CurrencyAmount);
      expect(resultCA.currency).toBeInstanceOf(ERC20);
      expect(resultCA.numerator.toString()).toEqual('3000000000000000000');
    } catch (error) {
      fail('Something didnt curring when expected please review your test');
    }
  });
});
