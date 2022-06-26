export interface ZapModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface ZapProps {
  customAction?: () => void;
}
