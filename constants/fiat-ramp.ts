import { CHAIN_ID } from '@/sdk';

const TRANSAK_NETWORK_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: 'BSC',
  [CHAIN_ID.BNB_MAIN_MET]: 'BSC',
  [CHAIN_ID.RINKEBY]: 'ethereum',
};
const TRANSAK_CURRENCY_MAP = {
  [CHAIN_ID.BNB_TEST_NET]: 'BNB',
  [CHAIN_ID.BNB_MAIN_MET]: 'BNB',
  [CHAIN_ID.RINKEBY]: 'ETH',
};

export const makeFIATWidgetURL = (chainId: number, address: string) =>
  `${process.env.NEXT_PUBLIC_TRANSAK_WIDGET_URL}&exchangeScreenTitle=Buy%20${
    TRANSAK_CURRENCY_MAP[chainId] || 'BNB'
  }&isFeeCalculationHidden=true&disableWalletAddressForm=true&hideMenu=true&cryptoCurrencyCode=${
    TRANSAK_CURRENCY_MAP[chainId] || 'BNB'
  }&network=${TRANSAK_NETWORK_MAP[chainId] || 'BSC'}&walletAddress=${address}`;
