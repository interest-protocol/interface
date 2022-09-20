import { FC } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import { useSwitchNetwork } from 'wagmi';

import { isChainIdSupported } from '@/constants';

import ConnectWallet from './connect-wallet';
import ConnectedWallet from './connected-wallet';
import SelectNetwork from './select-network';
import SwitchingNetwork from './switching-network';
import WrongNetwork from './wrong-network';

const Wallet: FC = () => {
  const { isLoading, error } = useConnect();
  const { isConnecting, isReconnecting, isDisconnected } = useAccount();
  const { switchNetwork, isLoading: isSwitching } = useSwitchNetwork();
  const { chain } = useNetwork();

  if (isSwitching) return <SwitchingNetwork />;

  if (isLoading || isReconnecting || isConnecting) return <div> loading</div>;

  if (isDisconnected) return <ConnectWallet />;

  if (error || !chain) return <div>error</div>;

  if (!!chain && !isChainIdSupported(chain.id))
    return (
      <>
        {switchNetwork && (
          <SelectNetwork switchNetwork={switchNetwork} chainId={chain.id} />
        )}
        <WrongNetwork />
      </>
    );

  return (
    <>
      {switchNetwork && (
        <SelectNetwork
          switchNetwork={switchNetwork}
          chainId={chain?.id || -1}
        />
      )}
      <ConnectedWallet />
    </>
  );
};

export default Wallet;
