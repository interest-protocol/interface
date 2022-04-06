import { BigNumber } from 'ethers';

export const closeTo = (
  x: BigNumber,
  y: BigNumber,
  margin: BigNumber
): boolean => {
  return y.sub(margin).lte(x);
};
