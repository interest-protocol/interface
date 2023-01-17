import { FC } from 'react';

import { ConnectWallet } from '@/components';
import { Box } from '@/elements';
import { useWeb3 } from '@/hooks';

const WalletGuardButton: FC = ({ children }) =>
  useWeb3().connected ? (
    <>{children}</>
  ) : (
    <Box display="flex" flexDirection="column" my="M">
      <ConnectWallet />
    </Box>
  );

export default WalletGuardButton;
