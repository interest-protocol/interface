import { Box } from '@/elements';
import { useIdAccount } from '@/hooks/use-id-account';
import { FCWithChildren } from '@/interface';

import ConnectWallet from '../wallet/connect-wallet';

const WalletGuardButton: FCWithChildren = ({ children }) =>
  useIdAccount().account ? (
    <>{children}</>
  ) : (
    <Box display="flex" flexDirection="column" my="M">
      <ConnectWallet />
    </Box>
  );

export default WalletGuardButton;
