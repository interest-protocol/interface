export enum GACategory {
  SocialNetwork = 'SOCIAL_NETWORK',
  HeaderNavigation = 'HEADER_NAVIGATION',
  Operation = 'OPERATION',
  Wallet = 'WALLET',
  FarmFilters = 'FARMS_FILTERS',
  VaultFilters = 'VAULTS_FILTERS',
  DineroMarketFilters = 'DINERO_FILTERS',
  SyntheticsMarketFilters = 'SYNTHETICS_FILTERS',
}

export enum GAAction {
  DesktopNavigate = 'DESKTOP_NAVIGATE',
  MobileNavigate = 'MOBILE_NAVIGATE',
  Access = 'ACCESS',
  Switch = 'SWITCH_FILTER',
  CreateToken = 'OPEN_MODAL_CREATE_TOKEN',
  FindAndEnterPool = 'FIND_AND_ENTER_POOL',
  Deposit = 'DEPOSIT',
  Withdraw = 'WITHDRAW',
  Borrow = 'BORROW',
  Repay = 'REPAY',
  Mint = 'MINT',
  Burn = 'BURN',
  Faucet = 'Faucet',
  SwitchNetwork = 'SWITCH_NETWORK',
}
