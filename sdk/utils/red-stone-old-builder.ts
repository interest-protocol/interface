import { TransactionResponse } from '@ethersproject/abstract-provider';
import { deepCopy } from '@ethersproject/properties';
import { BytesLike, Contract, ethers, Signer } from 'ethers';
import redstone from 'redstone-api-extended';

interface PriceDataType {
  symbols: string[];
  values: number[];
  timestamp: number;
}

interface SignedPriceDataType {
  priceData: PriceDataType;
  signature: string;
  liteSignature: string;
}

interface PriceFeedOptions {
  dataSources?: any;
  asset?: string;
}

interface PriceFeedConnector {
  getSignedPrice(): Promise<SignedPriceDataType>;
  getDefaultSigner(): string;
}

class RedStonePriceFeed implements PriceFeedConnector {
  constructor(
    dataFeedId: string,
    private priceFeedOptions: PriceFeedOptions = {}
  ) {
    // Getting default data sources config for provider if not specified
    if (!this.priceFeedOptions.dataSources) {
      this.priceFeedOptions.dataSources =
        redstone.oracle.getDefaultDataSourcesConfig(dataFeedId as any);
    }
  }

  // This is the entrypoint function of this module
  async getSignedPrice(): Promise<SignedPriceDataType> {
    return await redstone.oracle.get(
      this.priceFeedOptions.dataSources!,
      this.priceFeedOptions.asset
    );
  }

  getDefaultSigner(): string {
    return this.priceFeedOptions.dataSources!.sources[0].evmSignerAddress;
  }
}

class EthersContractWrapperLite<T extends Contract> {
  constructor(
    protected readonly baseContract: T,
    protected readonly apiConnector: PriceFeedConnector
  ) {}

  getLiteDataBytesString(priceData: any): string {
    // Calculating lite price data bytes array
    let data = '';
    for (let i = 0; i < priceData.symbols.length; i++) {
      const symbol = priceData.symbols[i];
      const value = priceData.values[i];
      data += symbol.substr(2) + value.toString(16).padStart(64, '0');
    }
    data += Math.ceil(priceData.timestamp / 1000)
      .toString(16)
      .padStart(64, '0');

    return data;
  }

  protected async getPriceData(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signer: Signer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asset?: string
  ): Promise<string> {
    const { priceData, liteSignature } =
      await this.apiConnector.getSignedPrice();

    let data = this.getLiteDataBytesString(priceData);

    data +=
      priceData.symbols.length.toString(16).padStart(2, '0') +
      liteSignature.substr(2);
    return data;
  }

  protected getMarkerData(): string {
    const marker = ethers.utils.id('Redstone.version.0.0.1');
    return remove0xFromHexString(marker);
  }

  finish(): T {
    const contract = this.baseContract;
    const contractPrototype = Object.getPrototypeOf(contract);
    const wrappedContract = Object.assign(
      Object.create(contractPrototype),
      contract
    );
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const functionNames: string[] = Object.keys(contract.functions);
    functionNames.forEach((functionName) => {
      if (functionName.indexOf('(') == -1) {
        const isCall = contract.interface.getFunction(functionName).constant;
        if (functionName == 'authorizeSigner') {
          (wrappedContract['authorizeProvider'] as any) = async function () {
            const signer = self.apiConnector.getDefaultSigner();
            console.log('Authorizing provider: ' + signer);
            return await wrappedContract.authorizeSigner(signer);
          };
        } else {
          (wrappedContract[functionName] as any) = async function (
            ...args: any[]
          ) {
            const tx = await contract.populateTransaction[functionName](
              ...args
            );

            // Here we append price data (currently with function signatures) to transaction data
            tx.data =
              tx.data +
              (await self.getPriceData(contract.signer)) +
              self.getMarkerData();

            if (isCall) {
              const result = await contract.signer.call(tx);
              const decoded = contract.interface.decodeFunctionResult(
                functionName,
                result
              );
              return decoded.length == 1 ? decoded[0] : decoded;
            } else {
              const sentTx = await contract.signer.sendTransaction(tx);

              // Tweak the tx.wait so the receipt has extra properties
              addContractWait(contract, sentTx);

              return sentTx;
            }
          };
        }
      }
    });

    return wrappedContract;
  }
}

// Copied from ethers.js implementation
function addContractWait(contract: Contract, tx: TransactionResponse) {
  const wait = tx.wait.bind(tx);
  tx.wait = (confirmations?: number) => {
    return wait(confirmations).then((receipt: any) => {
      receipt.events = receipt.logs.map((log: any) => {
        const event: any = <Event>deepCopy(log);
        // let parsed: LogDescription = null;
        let parsed: any = null;
        try {
          parsed = contract.interface.parseLog(log);
          // eslint-disable-next-line no-empty
        } catch (e) {}

        // Successfully parsed the event log; include it
        if (parsed) {
          event.args = parsed.args;
          event.decode = (data: BytesLike, topics?: Array<any>) => {
            return contract.interface.decodeEventLog(
              parsed.eventFragment,
              data,
              topics
            );
          };
          event.event = parsed.name;
          event.eventSignature = parsed.signature;
        }

        // Useful operations
        event.removeListener = () => {
          return contract.provider;
        };
        event.getBlock = () => {
          return contract.provider.getBlock(receipt.blockHash);
        };
        event.getTransaction = () => {
          return contract.provider.getTransaction(receipt.transactionHash);
        };
        event.getTransactionReceipt = () => {
          return Promise.resolve(receipt);
        };

        return event;
      });

      return receipt;
    });
  };
}

function remove0xFromHexString(hexString: string): string {
  if (!hexString?.toLowerCase().startsWith('0x')) {
    return hexString;
  }

  return hexString.substr(2);
}

class EthersContractWrapperBuilder<T extends Contract> {
  constructor(private readonly baseContract: T) {}

  usingPriceFeed(dataFeedId: string, opts: PriceFeedOptions = {}): T {
    const priceFeedConnector = new RedStonePriceFeed(dataFeedId, opts);
    return new EthersContractWrapperLite(
      this.baseContract,
      priceFeedConnector
    ).finish();
  }
}

/**
 * Putting "wrap" and "mock" methods directly in EthersContractWrapper or EtherContractWrapperList
 * was causing https://stackoverflow.com/a/44727578
 */
export class WrapperBuilder {
  static wrapLite<T extends Contract>(
    contract: T
  ): EthersContractWrapperBuilder<T> {
    return new EthersContractWrapperBuilder(contract);
  }
}
