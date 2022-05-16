import { hexStripZeros } from '@ethersproject/bytes';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { MetaMask } from '@web3-react/metamask';
import { Connector, ProviderRpcError } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { ethers } from 'ethers';

import { CHAINS, RPC_URL } from '@/constants/chains';

export async function switchToNetwork(
  connector: Connector,
  chainId: number
): Promise<null | void> {
  try {
    if (connector instanceof WalletConnect) {
      await connector.activate(chainId);
    } else {
      await connector.activate(CHAINS[chainId]);
    }
  } catch (error) {
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    if ((error as ProviderRpcError)?.code === 4902) {
      const formattedChainId = hexStripZeros(
        ethers.BigNumber.from(chainId).toHexString()
      );

      if (!connector.provider?.request) return;

      await connector.provider.request({
        method: 'wallet_addEthereumChain',
        params: CHAINS[chainId],
      });
      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      try {
        await connector.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: formattedChainId }],
        });
      } catch (error) {
        console.debug('Added network but could not switch chains', error);
      }
      // Metamask is trying to change Networks
    } else if (
      connector instanceof MetaMask &&
      (error as ProviderRpcError)?.code === 1013
    ) {
      await connector.activate();
      return;
    } else {
      throw error;
    }
  }
}

export const getStaticWeb3Provider = (chainId: number): StaticJsonRpcProvider =>
  new StaticJsonRpcProvider(RPC_URL[chainId]);
