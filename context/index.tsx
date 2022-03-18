import { FC } from 'react';

import { WalletProvider } from './wallet';

const ContextProvider: FC = ({ children }) => (
  <WalletProvider>{children}</WalletProvider>
);

export default ContextProvider;
