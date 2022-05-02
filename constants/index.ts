export * from './chains';
export * from './erc-20';
export * from './farms';
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

export const NO_STATE_ERROR = '';

export const NO_SWR_DATA = 'no/data';
