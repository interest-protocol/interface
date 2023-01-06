import { Network } from '@mysten/sui.js';

export * from './coins';
export * from './dex';
export * from './faucet';
export * from './routes';
export * from './social-media';

export const DEFAULT_ACCOUNT = '0x000000000000000000000000000000000000dEaD';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const SUI_EXPLORER = {
  [Network.DEVNET]: 'https://explorer.sui.io',
};
