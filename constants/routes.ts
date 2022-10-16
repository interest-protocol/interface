/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Home = 'home',
  DApp = 'dapp',
  DineroMarket = 'dinero-market',
  DineroMarketBorrow = 'dinero-market-borrow',
  DineroMarketRepay = 'dinero-market-repay',
  Farms = 'farms',
  Vaults = 'vaults',
  DineroVault = 'dinero-vault',
  FarmDetails = 'farm-details',
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
  [RoutesEnum.DineroMarketBorrow]: '/dapp/dinero-market/[address]/borrow',
  [RoutesEnum.DineroMarketRepay]: '/dapp/dinero-market/[address]/repay',
  [RoutesEnum.Farms]: '/dapp/farms',
  [RoutesEnum.DineroVault]: '/dapp/dinero-vault/[address]',
  [RoutesEnum.Vaults]: '/dapp/vaults',
  [RoutesEnum.FarmDetails]: '/dapp/farms/[tokenAddress]',
  [RoutesEnum.Faucet]: '/dapp/faucet',
};

export const RoutesWithFaucet = [
  Routes[RoutesEnum.Farms],
  Routes[RoutesEnum.DineroMarket],
  Routes[RoutesEnum.DEX],
  Routes[RoutesEnum.DEXPool],
  Routes[RoutesEnum.DEXFindPool],
  Routes[RoutesEnum.DEXPoolDetails],
  Routes[RoutesEnum.Vaults],
  Routes[RoutesEnum.DineroVault],
];

export const routesList = Object.keys(Routes) as ReadonlyArray<RoutesEnum>;
