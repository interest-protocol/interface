import { always, cond, equals, identity, T } from 'ramda';

import { WRAPPED_NATIVE_TOKEN } from '@/constants';
import { ERC_20_DATA } from '@/constants/erc-20';
import { CHAIN_ID, TOKEN_SYMBOL } from '@/sdk';
import { ERC20 } from '@/sdk/entities/erc-20';
import { isZeroAddress, safeGetAddress } from '@/utils/address';

export const getERC20Data = (chainId: number, address: string): ERC20 =>
  ERC_20_DATA[chainId][safeGetAddress(address)];

export const replaceWrappedNativeTokenWithNativeTokenSymbol = cond<
  any,
  TOKEN_SYMBOL
>([
  [equals(TOKEN_SYMBOL.WBNB), always(TOKEN_SYMBOL.BNB)],
  [equals(TOKEN_SYMBOL.WETH), always(TOKEN_SYMBOL.ETH)],
  [T, identity],
]);

export const handleZeroWrappedToken = (chainId: number, token: string) => {
  const wrappedNativeTokenAddress = WRAPPED_NATIVE_TOKEN[chainId]
    ? WRAPPED_NATIVE_TOKEN[chainId].address
    : WRAPPED_NATIVE_TOKEN[CHAIN_ID.BNB_TEST_NET].address;

  return isZeroAddress(token) ? wrappedNativeTokenAddress : token;
};
