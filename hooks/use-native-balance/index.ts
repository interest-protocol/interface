import { QueryKeyArgs } from './use-native-balance.types';

export const queryKey = ({
  chainId,
  account,
}: QueryKeyArgs & {
  chainId?: number;
}) => [{ entity: 'nativeBalance', chainId, account }] as const;

export function useNativeBalance() {
  return null;
}
