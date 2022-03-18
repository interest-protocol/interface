import { createContext, FC, useState } from 'react';

import { IWallet, TWalletAccountData } from './wallet.types';

const walletContext = createContext({} as IWallet);

export const WalletProvider: FC = ({ children }) => {
  const { Provider } = walletContext;
  const [accountData, setAccountData] =
    useState<TWalletAccountData | null>(null);

  const WALLET_CONTEXT_VALUE: IWallet = {
    accountData,
    setAccountData,
  };

  return <Provider value={WALLET_CONTEXT_VALUE}>{children}</Provider>;
};

export default walletContext;
