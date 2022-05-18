import { CHAIN_ID } from '@/sdk';

import { getERC20Data } from '../index';

describe(getERC20Data.name, () => {
  it('Should be a true because are different', () => {
    /* test to see what value it return*/
    const result = getERC20Data(
      CHAIN_ID.BSC_TEST_NET,
      '0x71bBD8fF7D6180BB933ca92DF2525563AAA2Ee78'
    );
    console.log(result);
  });
});
