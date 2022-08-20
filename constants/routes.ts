/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Home = 'home',
  DApp = 'dapp',
  DineroMarket = 'dinero-market',
  DineroMarketBorrow = 'dinero-market-borrow',
  MAILMarket = 'mail-market',
  MAILMarketPool = 'mail-market-pool',
  DineroMarketRepay = 'dinero-market-repay',
  Earn = 'earn',
  EarnFarm = 'earn-farm',
  DEX = 'dex',
  DEXPool = 'dex-pool',
  DEXFindPool = 'dex-find-pool',
  DEXPoolDetails = 'dex-pool-details',
  Faucet = 'faucet',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Home]: '/',
  [RoutesEnum.DApp]: '/dapp',
  [RoutesEnum.DEX]: '/dapp/dex',
  [RoutesEnum.DEXPool]: '/dapp/dex/pool',
  [RoutesEnum.DEXFindPool]: '/dapp/dex/pool/find',
  [RoutesEnum.DEXPoolDetails]: '/dapp/dex/pool/[pairAddress]',
  [RoutesEnum.DineroMarket]: '/dapp/dinero-market',
  [RoutesEnum.DineroMarketBorrow]: '/dapp/dinero-market/borrow',
  [RoutesEnum.DineroMarketRepay]: '/dapp/dinero-market/repay',
  [RoutesEnum.MAILMarket]: '/dapp/mail-market',
  [RoutesEnum.MAILMarketPool]: '/dapp/mail-market/[pool]',
  [RoutesEnum.Earn]: '/dapp/earn',
  [RoutesEnum.EarnFarm]: '/dapp/earn/[tokenAddress]',
  [RoutesEnum.Faucet]: '/dapp/faucet',
};

export const RoutesWithFaucet = [
  Routes[RoutesEnum.Earn],
  Routes[RoutesEnum.DineroMarket],
  Routes[RoutesEnum.MAILMarket],
  Routes[RoutesEnum.DEX],
  Routes[RoutesEnum.DEXPool],
  Routes[RoutesEnum.DEXFindPool],
  Routes[RoutesEnum.DEXPoolDetails],
];

export const routesList = Object.keys(Routes) as ReadonlyArray<RoutesEnum>;
