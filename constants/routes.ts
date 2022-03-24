/**
 * @RoutesEnum is a custom data type
 * Description: this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Home = 'home',
  DApp = 'dapp',
  Borrow = 'borrow',
  Repay = 'repay',
  NFTLoans = 'nftLoads',
  NFTLend = 'nftLend',
  NFTBorrow = 'nftBorrow',
}

/**
 * @Routes is the constant with our internal or external routes
 * Description: this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Home]: '/',
  [RoutesEnum.DApp]: '/dapp',
  [RoutesEnum.Borrow]: '/dapp/borrow',
  [RoutesEnum.Repay]: '/dapp/borrow/repay',
  [RoutesEnum.NFTLoans]: '/dapp/nft',
  [RoutesEnum.NFTLend]: '/dapp/nft/lend',
  [RoutesEnum.NFTBorrow]: '/dapp/nft/borrow',
};

export const routesList = Object.keys(Routes) as ReadonlyArray<RoutesEnum>;
