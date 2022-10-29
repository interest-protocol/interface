import { Box } from '@/elements';
import { useIdAccount } from '@/hooks/use-id-account';
import { NestedFC } from '@/interface';

import ConnectWallet from '../wallet/connect-wallet';

const WalletGuardButton: NestedFC = ({ children }) =>
  useIdAccount().account ? (
    <>{children}</>
  ) : (
    <Box display="flex" flexDirection="column" my="M">
      <ConnectWallet />
    </Box>
  );

export default WalletGuardButton;
