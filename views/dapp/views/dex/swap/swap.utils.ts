import { WRAPPED_NATIVE_TOKEN } from '@/constants';
import { CHAIN_ID } from '@/sdk';
import { isZeroAddress } from '@/utils';

export const handleRoute = (
  chainId: number,
  tokenInAddress: string,
  tokenOutAddress: string,
  base: string
) => {
  const wrappedNativeTokenAddress = WRAPPED_NATIVE_TOKEN[chainId]
    ? WRAPPED_NATIVE_TOKEN[chainId].address
    : WRAPPED_NATIVE_TOKEN[CHAIN_ID.BNB_TEST_NET].address;

  const parsedTokenIn = isZeroAddress(tokenInAddress)
    ? wrappedNativeTokenAddress
    : tokenInAddress;

  const parsedTokenOut = isZeroAddress(tokenOutAddress)
    ? wrappedNativeTokenAddress
    : tokenOutAddress;

  return isZeroAddress(base)
    ? [
        {
          from: parsedTokenIn,
          to: parsedTokenOut,
        },
      ]
    : [
        {
          from: parsedTokenIn,
          to: base,
        },
        {
          from: base,
          to: parsedTokenOut,
        },
      ];
};
