import { handleZeroWrappedToken, isZeroAddress } from '@/utils';

export const handleRoute = (
  chainId: number,
  tokenInAddress: string,
  tokenOutAddress: string,
  base: string
) =>
  isZeroAddress(base)
    ? [
        {
          from: handleZeroWrappedToken(chainId, tokenInAddress),
          to: handleZeroWrappedToken(chainId, tokenOutAddress),
        },
      ]
    : [
        {
          from: handleZeroWrappedToken(chainId, tokenInAddress),
          to: base,
        },
        {
          from: base,
          to: handleZeroWrappedToken(chainId, tokenOutAddress),
        },
      ];
