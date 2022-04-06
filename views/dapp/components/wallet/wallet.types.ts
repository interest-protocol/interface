import { FC, SVGAttributes } from 'react';

export interface InfoModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface WalletButtonProps {
  name: string;
  onClick: () => Promise<void>;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}

export interface ConnectWalletProps {
  showModal: boolean;
  toggleModal: () => void;
}

export interface AccountModalProps extends ConnectWalletProps {
  account: string;
  url: string;
}
