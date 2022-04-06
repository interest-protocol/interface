import { getPriorityConnector } from '@web3-react/core';

import { hooks as metaMaskHooks, metaMask } from './meta-mask';
import { hooks as walletConnectHooks, walletConnect } from './wallet-connect';

export default getPriorityConnector(
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks]
);
