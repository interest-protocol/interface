import { Control, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import TokenMinterABI from '@/sdk/abi/token-minter.abi.json';
import { getTokenMinterAddress, safeToBigNumber } from '@/utils';

import { TCreateTokenForm } from './create-token-form.types';

export const useCreateToken = (
  chainId: number,
  control: Control<TCreateTokenForm>
) => {
  const [{ name, symbol, amount }] = useDebounce(useWatch({ control }), 500, {
    equalityFn: (x, y) =>
      x.amount === y.amount && x.name === y.name && x.symbol === y.symbol,
  });

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
