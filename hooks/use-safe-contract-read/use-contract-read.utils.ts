import { readContract, ReadContractConfig } from '@wagmi/core';

import { QueryFunctionArgs, QueryKeyArgs } from '@/interface';

export const queryKey = ({
  address,
  args,
  chainId,
  functionName,
  overrides,
}: QueryKeyArgs) =>
  [
    {
      entity: 'readContract',
      address,
      args,
      chainId,
      functionName,
      overrides,
    },
  ] as const;

export const queryFn =
  ({ abi }: Pick<ReadContractConfig, 'abi'>) =>
  async ({
    queryKey: [{ address, args, chainId, functionName, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    return (
      (await readContract({
        address,
        args,
        chainId,
        abi,
        functionName,
        overrides,
      })) ?? null
    );
  };
