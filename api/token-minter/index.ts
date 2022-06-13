import { getTokenMinterSignerContract } from '@/utils';

import { CreateToken } from './token-minter.types';

export const createToken: CreateToken = (chainId, signer, ...rest) => {
  const contract = getTokenMinterSignerContract(chainId, signer);

  return contract.createToken(...rest);
};
