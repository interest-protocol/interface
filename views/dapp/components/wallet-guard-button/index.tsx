import { FC } from 'react';

import { Box } from '@/elements';
import { useIdAccount } from '@/hooks/use-id-account';

import ConnectWallet from '../wallet/connect-wallet';

const WalletGuardButton: FC = ({ children }) => {
  const { account } = useIdAccount();

  if (!account)
    return (
      <Box mx="auto" my="M">
        <ConnectWallet />
      </Box>
    );

  return <>{children}</>;
};

export default WalletGuardButton;
