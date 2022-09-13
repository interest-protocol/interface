export * from './chains';
export * from './dex';
export * from './erc-20';
export * from './farms';
export * from './mail-markets';
export * from './routes';
export * from './social-media';
export * from './wallets';

export const isDevelopment = process.env.NODE_ENV === 'development';

export enum LoadingState {
  Idle,
  Fetching,
  Submitting,
  Updating,
}

export enum StakeState {
  Stake,
  Unstake,
}

export const NO_STATE_ERROR = '';

export const DEFAULT_ERC_20_DECIMALS = 18;

export const DEFAULT_ACCOUNT = '0x000000000000000000000000000000000000dEaD';
