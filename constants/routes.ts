/**
 * @RoutesEnum is a custom data type
 * Description: this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Home = 'home',
  DApp = 'dapp',
  DineroMarket = 'dinero-market',
  MAILMarket = 'mail-market',
  MAILMarketPool = 'mail-market-pool',
  DineroMarketRepay = 'repay',
  Earn = 'earn',
  Swap = 'swap',
  Faucet = 'faucet',
}

/**
 * @Routes is the constant with our internal or external routes
 * Description: this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Home]: '/',
  [RoutesEnum.DApp]: '/dapp',
  [RoutesEnum.DineroMarket]: '/dapp/dinero-market',
  [RoutesEnum.MAILMarket]: '/dapp/mail-market',
  [RoutesEnum.MAILMarketPool]: '/dapp/mail-market/[pool]',
  [RoutesEnum.DineroMarketRepay]: '/dapp/dinero-market/repay',
  [RoutesEnum.Earn]: '/dapp/earn',
  [RoutesEnum.Swap]: '/dapp/swap',
  [RoutesEnum.Faucet]: '/dapp/faucet',
};

export const routesList = Object.keys(Routes) as ReadonlyArray<RoutesEnum>;
