import { ButtonProps } from '@/elements/button/button.types';
import { Pages } from '@/utils/analytics';

export interface ApproveButtonProps {
  enabled: boolean;
  spender: string;
  contract: string;
  chainId: number;
  refetch: () => Promise<void>;
  buttonProps?: ButtonProps;
  pageName: Pages;
}
