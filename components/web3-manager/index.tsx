import { useWallet } from '@mysten/wallet-kit';
import { createContext, FC, useEffect, useState } from 'react';
import useSWR from 'swr';

import { makeSWRKey, provider } from '@/utils';

import { Web3ManagerProps, Web3ManagerState } from './web3-manager.types';
import { parseCoins } from './web3-manager.utils';

const CONTEXT_DE_DEFAULT_STATE = {
  account: null,
  coins: [],
  coinsMap: {},
  connected: false,
  error: false,
};

export const Web3ManagerContext = createContext<Web3ManagerState>(
  CONTEXT_DE_DEFAULT_STATE
);

const Web3Manager: FC<Web3ManagerProps> = ({ children }) => {
  const { getAccounts, connected, connecting, isError, status } = useWallet();

  const [account, setAccount] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      if (connected) {
        const accounts = await getAccounts();
        setAccount(accounts[0]);
      }
    })();
  }, [connected, connecting, isError, status]);

  const { data, error } = useSWR(
    makeSWRKey([account], 'getCoinBalancesOwnedByAddress'),
    async () => (account ? provider.getCoinBalancesOwnedByAddress(account) : [])
  );

  const [coins, coinsMap] = parseCoins(data);

  return (
    <Web3ManagerContext.Provider
      value={{ account, error: isError || !!error, connected, coins, coinsMap }}
    >
      {children}
    </Web3ManagerContext.Provider>
  );
};

export default Web3Manager;
