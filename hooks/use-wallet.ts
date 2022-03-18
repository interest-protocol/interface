import { useContext } from 'react';

import walletContext from '../context/wallet';
import { IWallet } from './../context/wallet/wallet.types';

const useWallet = (): IWallet => useContext(walletContext);

export default useWallet;
