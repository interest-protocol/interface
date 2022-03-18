import { FC, SVGAttributes } from 'react';

import { IWallet } from '../../../../context/wallet/wallet.types';
import { IDropdownData } from '../../../../elements/dropdown/dropdown.types';

export type TWalletTypes =
  | 'meta-mask'
  | 'trust-wallet'
  | 'ledger'
  | 'binance-wallet'
  | 'wallet-connect';

export interface IWalletOption {
  key: TWalletTypes;
  name: string;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}

export interface INetworkOption {
  key: string;
  name: string;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}

export type TWalletConnectPromises = Record<TWalletTypes, () => Promise<null>>;

export type TWalletOptionsMapToDropdown = (
  data: ReadonlyArray<IWalletOption>,
  setAccountData: IWallet['setAccountData']
) => ReadonlyArray<IDropdownData>;
