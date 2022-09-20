import { FC, SVGAttributes } from 'react';
import { Connector } from 'wagmi';

import { Wallets } from '@/constants';

export interface InfoModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface WalletButtonProps {
  name: string;
  onClick: () => void;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}

export interface ConnectWalletProps {
  showModal: boolean;
  toggleModal: () => void;
}

export interface AccountModalProps extends ConnectWalletProps {
  account: string;
}

export interface SelectNetworkProps {
  switchNetwork: (chainId: number) => void;
  chainId: number;
}
