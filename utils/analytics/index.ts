import ReactGA from 'react-ga4';

export const initGA = (): void => {
  ReactGA.initialize(
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? 'G-3M99P49E9B'
  );
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export enum Status {
  Success = 'S',
  Error = 'E',
}

export enum Type {
  Read = 'R',
  Write = 'W',
}

export enum Pages {
  DexSwap = 'Dex-Swap',
  DexPool = 'DexPool',
  DexFindPool = 'DexFindPool',
  DexFindPoolCreatePool = 'DexFindPoolCreatePool',
  DexPoolDetails = 'DexPoolDetails',
  DexPoolDetailsRemoveLiquidity = 'DexPoolDetailsRemoveLiquidity',
  DexPoolDetailsAddLiquidity = 'DexPoolDetailsAddLiquidity',
  DineroMarket = 'DineroMarket',
  DineroMarketPanel = 'DineroMarketPanel',
  DineroVault = 'DineroVault',
  Vault = 'Vault',
  Farms = 'Farms',
  FarmsDetails = 'FarmsDetails',
  Faucet = 'Faucet',
  SyntheticsMarket = 'SyntheticsMarket',
  SyntheticsMarketPanel = 'SyntheticsMarketPanel',
  ApproveButton = 'ApproveButton',
}

interface LogProps {
  status: Status;
  type: Type;
  pages: Pages;
  functionName: string;
  componentsName: string;
}

export const logTransactionEvent = ({
  status,
  type,
  pages,
  functionName,
}: LogProps): void => {
  ReactGA.event(`${status}_${type}_${pages}_${functionName}`);
};

export const logGenericEvent = (action: string): void => {
  ReactGA.event(action);
};
