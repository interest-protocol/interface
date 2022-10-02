export interface CreatePoolPopupProps {
  isOpen: boolean;
  symbol0: string;
  symbol1: string;
  isStable: boolean;
  onCancel: () => void;
  onContinue: () => void;
}
