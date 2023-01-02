import { getObjectT } from '@mysten/sui.js';

import { useGetCoinBalancesOwnedByAddress } from '@/hooks/use-get-coin-balances-owned-by-address';
import { provider } from '@/utils';
const Faucet = () => {
  // const getSuiTestToken = async () => {
  //   try {
  //     const response = await provider.requestSuiFromFaucet(
  //       '0xc6e037c5dcd9611062522a2ef126a19d2317ca49'
  //     );
  //     console.log(
  //       `You received ${response.transferred_gas_objects.amount} SUI`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //
  // const getBNB = () => {};
  //
  // console.log(
  //   useGetCoinBalancesOwnedByAddress(
  //     '0xff8d9e72bd0d2ea58101e38da9b17308d0149db2'
  //   ),
  //   'WTF'
  // );

  return (
    <div>
      {/*<h1>Faucet</h1>*/}
      {/*<button type="button" onClick={getSuiTestToken}>*/}
      {/*  Get SUI*/}
      {/*</button>*/}
      {/*<div>*/}
      {/*  <p>BNB Balance</p>*/}
      {/*</div>*/}
    </div>
  );
};

export default Faucet;
