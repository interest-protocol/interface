export * from './chains';
export * from './dex';
export * from './dinero-markets';
export * from './erc-20';
export * from './farms';
export * from './fiat-ramp';
export * from './routes';
export * from './social-media';
export * from './vaults';
export * from './wallets';

export enum StakeState {
  Stake,
  Unstake,
}

export const DEFAULT_ERC_20_DECIMALS = 18;

export const DEFAULT_ACCOUNT = '0x000000000000000000000000000000000000dEaD';
