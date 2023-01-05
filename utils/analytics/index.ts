/* import ReactGA from 'react-ga4';

export const initGA = (): void => {
  ReactGA.initialize(
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? 'G-3M99P49E9B'
  );
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export enum GAStatus {
  Success = 'S',
  Error = 'E',
}

export enum GAType {
  Read = 'R',
  Write = 'W',
}

export enum GAPage {
  DexSwap = 'Dex-Swap',
  DexFindPool = 'DexFindPool',
  DexFindPoolCreatePool = 'DexFindPoolCreatePool',
  DexPoolDetails = 'DexPoolDetails',
  DexPoolDetailsRemoveLiquidity = 'DexPoolDetailsRemoveLiquidity',
  DexPoolDetailsAddLiquidity = 'DexPoolDetailsAddLiquidity',
  Faucet = 'Faucet',
}

interface LogProps {
  status: GAStatus;
  type: GAType;
  page: GAPage;
  functionName: string;
}

export const logTransactionEvent = ({
  status,
  type,
  page,
  functionName,
}: LogProps): void => {
  ReactGA.event(`${status}_${type}_${page}_${functionName}`);
};

export const logGenericEvent = (action: string): void => {
  ReactGA.event(action);
};
 */

export {};
