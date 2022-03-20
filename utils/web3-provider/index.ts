import { hexStripZeros } from '@ethersproject/bytes';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

import { CHAIN_ID, CHAINS } from '@/sdk/chains';

export async function switchToNetwork(
  provider: Web3Provider,
  chainId: CHAIN_ID
): Promise<null | void> {
  if (!provider?.provider?.request) {
    return;
  }

  const formattedChainId = hexStripZeros(
    ethers.BigNumber.from(chainId).toHexString()
  );
  try {
    await provider.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }],
    });
  } catch (error) {
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    if ((error as Record<string, number>)?.code === 4902) {
      const info = CHAINS[chainId];

      await provider.provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: formattedChainId,
            chainName: info.chainName,
            rpcUrls: info.rpcUrls,
            nativeCurrency: info.nativeCurrency,
            blockExplorerUrls: info.blockExplorerUrls,
          },
        ],
      });
      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      try {
        await provider.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: formattedChainId }],
        });
      } catch (error) {
        console.debug('Added network but could not switch chains', error);
      }
    } else {
      throw error;
    }
  }
}
