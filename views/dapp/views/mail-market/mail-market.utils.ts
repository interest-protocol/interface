import { LocalMAILMarketData } from '@/interface';
import { isSameAddress } from '@/utils';

export const isOnLocalStorage = (
  address: string,
  localAssets: ReadonlyArray<LocalMAILMarketData>
): boolean =>
  !!localAssets.filter((item) => isSameAddress(item.market, address)).length;

export const removeFromLocalStorage = (
  address: string,
  localAssets: ReadonlyArray<LocalMAILMarketData>
): Array<LocalMAILMarketData> =>
  localAssets.filter((item) => !isSameAddress(address, item.market));
