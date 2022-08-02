import { FC } from 'react';

import { Box } from '@/elements';
import { useIdAccount } from '@/hooks/use-id-account';

import ConnectWallet from '../wallet/connect-wallet';

const WalletGuardButton: FC = ({ children }) =>
  useIdAccount().account ? (
    <>{children}</>
  ) : (
    <Box display="flex" flexDirection="column" my="M">
      <ConnectWallet />
    </Box>
  );

export default WalletGuardButton;
