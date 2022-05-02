import { ethers } from 'ethers';

import { CHAIN_ID } from '@/sdk/../../../constants/chains';
import { DINERO_MARKET_CONTRACTS_MAP } from '@/sdk/../../../constants/dinero-market-contracts';
import { TOKEN_SYMBOL } from '@/sdk/../../../constants/erc-20';
import BTCDineroMarketABI from '@/sdk/abi/btc-dinero-market.abi.json';

import { BtcDineroMarketAbi } from '../../types/ethers-contracts';
import { TGetBTCPrice } from './price.types';

export const getBTCPrice: TGetBTCPrice = (provider) => {
  const dineroMarket = new ethers.Contract(
    DINERO_MARKET_CONTRACTS_MAP[CHAIN_ID.BSC_TEST_NET][TOKEN_SYMBOL.BTC],
    BTCDineroMarketABI,
    provider
  ) as BtcDineroMarketAbi;

  return dineroMarket.exchangeRate();
};
