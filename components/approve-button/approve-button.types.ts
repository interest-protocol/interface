import { ButtonProps } from '@/elements/button/button.types';
import { GAPage } from '@/utils/analytics';

export interface ApproveButtonProps {
  enabled: boolean;
  spender: string;
  contract: `0x${string}`;
  chainId: number;
  refetch: () => Promise<void>;
  buttonProps?: ButtonProps;
  pageName: GAPage;
}
