import { ButtonProps } from '@/elements/button/button.types';
import { GAPage } from '@/utils/analytics';

export interface ApproveButtonProps {
  chainId: number;
  spender: string;
  pageName: GAPage;
  enabled: boolean;
  contract: `0x${string}`;
  buttonProps?: ButtonProps;
  refetch: () => Promise<void>;
}
export interface ErrorButtonProps {
  error: string;
}
