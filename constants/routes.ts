/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Home = 'home',
  DApp = 'dapp',
  Borrow = 'dinero-market',
  MAILMarket = 'mail-market',
  MAILMarketPool = 'mail-market-pool',
  Repay = 'repay',
  Earn = 'earn',
  Swap = 'swap',
  Faucet = 'faucet',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Home]: '/',
  [RoutesEnum.DApp]: '/dapp',
  [RoutesEnum.Borrow]: '/dapp/dinero-market',
  [RoutesEnum.MAILMarket]: '/dapp/mail-market',
  [RoutesEnum.MAILMarketPool]: '/dapp/mail-market/[pool]',
  [RoutesEnum.Repay]: '/dapp/dinero-market/repay',
  [RoutesEnum.Earn]: '/dapp/earn',
  [RoutesEnum.Faucet]: '/dapp/faucet',
  [RoutesEnum.Swap]: '/dapp/swap',
};

export const routesList = Object.keys(Routes) as ReadonlyArray<RoutesEnum>;
