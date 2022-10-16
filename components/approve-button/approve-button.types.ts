import { ButtonProps } from '@/elements/button/button.types';

export interface ApproveButtonProps {
  enabled: boolean;
  spender: string;
  contract: string;
  chainId: number;
  refetch: () => Promise<void>;
  buttonProps?: ButtonProps;
}
