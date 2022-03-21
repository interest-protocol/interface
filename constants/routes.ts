/**
 * @RoutesEnum is a custom data type
 * Description: this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Home = 'home',
  DApp = 'dapp',
  Loans = 'loads',
  Lend = 'lend',
  Borrow = 'borrow',
}

/**
 * @Routes is the constant with our internal or external routes
 * Description: this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Home]: '/',
  [RoutesEnum.DApp]: '/dapp',
  [RoutesEnum.Loans]: '/dapp/loans',
  [RoutesEnum.Lend]: '/dapp/loans/lend',
  [RoutesEnum.Borrow]: '/dapp/loans/borrow',
};

export const routesList = Object.keys(Routes) as ReadonlyArray<RoutesEnum>;
