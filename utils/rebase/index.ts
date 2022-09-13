import { BigNumber } from 'ethers';

export const principalToElastic = (
  totalElastic: BigNumber,
  totalBase: BigNumber,
  principal: BigNumber
) => {
  if (totalBase.isZero()) return principal;

  return principal.mul(totalElastic).div(totalBase);
};

export const elasticToPrincipal = (
  totalElastic: BigNumber,
  totalBase: BigNumber,
  elastic: BigNumber
) => {
  if (totalElastic.isZero()) return elastic;

  return elastic.mul(totalBase).div(totalElastic);
};
