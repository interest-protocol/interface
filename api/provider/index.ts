import { getStaticWeb3Provider } from '@/utils';

export const getAccountNativeBalance = (chainId: number, account: string) =>
  getStaticWeb3Provider(chainId).getBalance(account);
