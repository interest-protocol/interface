import { isZeroAddress } from '@/utils';

export const handleRoute = (
  tokenInAddress: string,
  tokenOutAddress: string,
  base: string
) =>
  isZeroAddress(base)
    ? [{ from: tokenInAddress, to: tokenOutAddress }]
    : [
        { from: tokenInAddress, to: base },
        { from: base, to: tokenOutAddress },
      ];
