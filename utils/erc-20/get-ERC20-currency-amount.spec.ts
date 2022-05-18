import { CHAIN_ID } from '@/sdk';

import { getERC20CurrencyAmount } from './index';

describe(getERC20CurrencyAmount.name, () => {
  it('Should be a true because are different', () => {
    /* test to see what value it return*/
    const result = getERC20CurrencyAmount(
      CHAIN_ID.BSC_TEST_NET,
      '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78',
      '10000000000000000000'
    );
    console.log(result);
  });
});
