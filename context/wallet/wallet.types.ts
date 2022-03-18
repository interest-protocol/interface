import { Dispatch, SetStateAction } from 'react';

import { TWalletTypes } from '../../views/dapp/layout/header/header.types';

export type TWalletAccountData = {
  balance: number;
  network: string;
  connected: boolean;
  wallet: TWalletTypes;
  accountNumber: string;
} | null;

export interface IWallet {
  accountData: TWalletAccountData;
  setAccountData: Dispatch<SetStateAction<TWalletAccountData>>;
}
