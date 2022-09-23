import { Control, useWatch } from 'react-hook-form';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { useDebounce } from '@/hooks';
import TokenMinterABI from '@/sdk/abi/token-minter.abi.json';
import { getTokenMinterAddress, safeToBigNumber } from '@/utils';

import { TCreateTokenForm } from './create-token-form.types';

export const useCreateToken = (
  chainId: number,
  control: Control<TCreateTokenForm>
) => {
  const { name, symbol, amount } = useDebounce(useWatch({ control }), 500);

  const bnAmount = safeToBigNumber(amount || '0');

  const { config } = usePrepareContractWrite({
    addressOrName: getTokenMinterAddress(chainId),
    contractInterface: TokenMinterABI,
    functionName: 'createToken',
    args: [name, symbol, bnAmount],
    enabled: !!name && !!symbol && !!amount && !bnAmount.isZero(),
  });

  return useContractWrite(config);
};
