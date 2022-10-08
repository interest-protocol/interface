import { readContract, ReadContractConfig } from '@wagmi/core';

import { QueryFunctionArgs } from '@/interface';

export const queryKey = ({
  addressOrName,
  args,
  chainId,
  functionName,
  overrides,
}: Omit<ReadContractConfig, 'contractInterface'>) =>
  [
    {
      entity: 'readContract',
      addressOrName,
      args,
      chainId,
      functionName,
      overrides,
    },
  ] as const;

export const queryFn =
  ({ contractInterface }: Pick<ReadContractConfig, 'contractInterface'>) =>
  async ({
    queryKey: [{ addressOrName, args, chainId, functionName, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    return (
      (await readContract({
        addressOrName,
        args,
        chainId,
        contractInterface,
        functionName,
        overrides,
      })) ?? null
    );
  };
