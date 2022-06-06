import { BigNumber } from 'ethers';

export const principalToElastic = (
  totalElastic: BigNumber,
  totalBase: BigNumber,
  principal: BigNumber
) => {
  if (totalBase.isZero()) return principal;

  return principal.mul(totalElastic).div(totalBase);
};
