import { hexValue } from '@ethersproject/bytes';
import { Ethereum } from '@wagmi/core';
import {
  Chain,
  ConnectorNotFoundError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

interface ConstructorConfig {
  chains?: Chain[];
}

/**
 * @description Binance Wallet only supports these 3 chains
 * */
export const BINANCE_WALLET_NETWORK_RECORD: Record<number, string> = {
  1: 'eth-mainnet',
  56: 'bsc-mainnet',
  97: 'bsc-testnet',
};

export class BinanceWalletConnector extends InjectedConnector {
  readonly id = 'binanceWallet';
  readonly name = 'Binance Wallet';
  readonly ready = typeof window !== 'undefined' && !!window.BinanceChain;

  #provider?: Window['BinanceChain'];

  constructor(config: ConstructorConfig) {
    const options = {
      name: 'Binance',
      shimDisconnect: true,
      shimChainChangedDisconnect: true,
    };
    const supportedChains = config.chains?.filter(
      (c) => !!BINANCE_WALLET_NETWORK_RECORD[c.id]
    );

    super({ chains: supportedChains, options });
  }

  async getProvider(): Promise<Window['BinanceChain'] | undefined> {
    if (!this.#provider && typeof window !== 'undefined')
      this.#provider = window.BinanceChain;

    return this.#provider;
  }

  async connect({ chainId }: { chainId?: number }): Promise<{
    account: string;
    chain: {
      id: number;
      unsupported: boolean;
    };
    provider: Ethereum;
  }> {
    try {
      const provider = await this.getProvider();

      if (!provider) throw new ConnectorNotFoundError();

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged);
        provider.on('chainChanged', this.onChainChanged);
        provider.on('disconnect', this.onDisconnect);
      }

      this.emit('message', { type: 'connecting' });

      const account = await this.getAccount();

      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);

      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }

      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error);
      if ((<RpcError>error).code === -32002)
        throw new ResourceUnavailableError(error);
      throw error;
    }
  }

  async switchChain(chainId: number): Promise<Chain> {
    const provider = await this.getProvider();

    if (!provider) throw new ConnectorNotFoundError();

    if (BINANCE_WALLET_NETWORK_RECORD[chainId]) {
      try {
        await this.#provider?.switchNetwork?.(
          BINANCE_WALLET_NETWORK_RECORD[chainId]
        );

        const id = hexValue(chainId);

        return (
          this.chains.find((x) => x.id === chainId) ?? {
            id: chainId,
            name: `Chain ${id}`,
            network: `${id}`,
            rpcUrls: { default: '' },
          }
        );
      } catch (error) {
        if ((error as any).error === 'user rejected') {
          throw new UserRejectedRequestError(error);
        }
      }
    }

    throw new SwitchChainNotSupportedError({ connector: this });
  }
}
