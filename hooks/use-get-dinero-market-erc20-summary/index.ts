import { ethers } from 'ethers';
import useSWR, { SWRResponse } from 'swr';

import priorityHooks from '@/connectors/index';
import dineroMarketERC20ABI from '@/constants/abi/btc-dinero-market.abi.json';
import { CHAIN_ID, getChainId } from '@/constants/chains';

import { BtcDineroMarketAbi } from '../../types/ethers-contracts';
import { SWRResponseData } from './use-get-dinero-market-erc20-summary.types';

const { usePriorityChainId, usePriorityProvider } = priorityHooks;

export const useGetDineroMarketErc20Summary = (
  addressArray: ReadonlyArray<string>
): SWRResponse<SWRResponseData> => {
  const chainId = usePriorityChainId();

  const provider = usePriorityProvider(chainId);

  return useSWR(
    `${addressArray[0]} ${chainId} useGetDineroMarketErc20Summary`,
    async () => {
      if (!provider || !chainId || getChainId(chainId) === CHAIN_ID.UNSUPPORTED)
        return Promise.reject();

      const contracts = addressArray.map(
        (x) =>
          new ethers.Contract(
            x,
            dineroMarketERC20ABI,
            provider
          ) as BtcDineroMarketAbi
      );
      const data = await Promise.all(
        contracts.map((contract) =>
          Promise.all([
            contract.totalCollateral(),
            contract.exchangeRate(),
            contract.loan(),
            contract.liquidationFee(),
            contract.maxLTVRatio(),
          ])
        )
      );

      return data.map((x) => ({
        totalCollateral: x[0],
        exchangeRate: x[1],
        loan: x[2],
        liquidationFee: x[3],
        ltv: x[4],
      }));
    }
  );
};
