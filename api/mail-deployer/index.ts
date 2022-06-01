import { JsonRpcSigner } from '@ethersproject/providers';

import { getMAILDeployerSignerContract } from '@/utils';

export const createMailMarket = (
  chainId: number,
  signer: JsonRpcSigner,
  token: string
) => {
  const contract = getMAILDeployerSignerContract(chainId, signer);

  return contract.deploy(token);
};
