import { BigNumber } from 'ethers';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

import { DineroMarketKind } from '@/constants';
import { IntMath } from '@/sdk';
import { SafeDineroMarketUserData } from '@/utils/dinero-market/dinero-market.types';

import { InterestViewDinero } from '../../../../types/ethers-contracts/InterestViewDineroV2Abi';

type TDineroMarketMode = 'borrow' | 'repay';

export interface DineroMarketPanelProps {
  address: string;
  mode: TDineroMarketMode;
}

export interface DineroMarketSwitchProps extends DineroMarketPanelProps {
  resetField: UseFormResetField<IBorrowForm>;
}

export interface IBorrowForm {
  repay: {
    collateral: string;
    loan: string;
    max: boolean;
  };
  borrow: {
    collateral: string;
    loan: string;
  };
}

export interface FormsProps {
  account: string;
  isPair: boolean;
  isSubmitting: boolean;
  isGettingData: boolean;
  mode: 'borrow' | 'repay';
  onSubmitRepay: () => void;
  onSubmitBorrow: () => void;
  data: SafeDineroMarketUserData;
  form: UseFormReturn<IBorrowForm>;
  symbols: [string, string | undefined];
  handleAddAllowance: () => Promise<void>;
}

export interface DineroMarketData {
  kind: DineroMarketKind;
  loanBase: BigNumber;
  loanElastic: BigNumber;
  interestRate: BigNumber;
  lastAccrued: BigNumber;
  collateralUSDPrice: BigNumber;
  liquidationFee: BigNumber;
  ltv: BigNumber;
  userCollateral: BigNumber;
  userPrincipal: BigNumber;
  collateralAllowance: BigNumber;
  collateralBalance: BigNumber;
  dnrBalance: BigNumber;
  pendingRewards: BigNumber;
  apr: IntMath;
  symbol0: string;
  symbol1: string;
  name: string;
  stable: boolean;
  marketAddress: string;
  collateralDecimals: number;
  collateralAddress: string;
}

export type GetSafeDineroMarketData = (
  chainId: number,
  market: string,
  data:
    | undefined
    | ([
        InterestViewDinero.DineroMarketDataStructOutput,
        InterestViewDinero.PoolDataStructOutput,
        InterestViewDinero.PoolDataStructOutput,
        InterestViewDinero.MintDataStructOutput,
        BigNumber,
        BigNumber
      ] & {
        marketData: InterestViewDinero.DineroMarketDataStructOutput;
        ipxPoolData: InterestViewDinero.PoolDataStructOutput;
        collateralPoolData: InterestViewDinero.PoolDataStructOutput;
        mintData: InterestViewDinero.MintDataStructOutput;
        nativeUSDPrice: BigNumber;
        baseTokenUSDPrice: BigNumber;
      })
) => DineroMarketData;
