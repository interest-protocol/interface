import { GetObjectDataResponse, SuiObjectInfo } from '@mysten/sui.js';
import { FC } from 'react';
import { Control, UseFormGetValues } from 'react-hook-form';
import { KeyedMutator } from 'swr';

import { SVGProps } from '@/components/svg/svg.types';
import { Web3ManagerState } from '@/components/web3-manager/web3-manager.types';

import { SwapFormTokenData } from '../dex.types';

export interface ISwapForm {
  tokenIn: SwapFormTokenData;
  tokenOut: SwapFormTokenData;
}

export interface OnSelectCurrencyData {
  type: string;
  symbol: string;
  decimals: number;
}

export interface SwapMessageProps {
  color?: string;
  message: string;
  Icon: FC<SVGProps>;
}

export type PoolsMap = Record<string, Record<string, SuiObjectInfo>>;

export interface SwapManagerProps {
  tokenInType: string;
  tokenOutType: string;
  poolsMap: PoolsMap;
}

export interface SwapPathObject {
  baseToken: string | null;
  tokenInType: string;
  tokenOutType: string;
  pools: ReadonlyArray<SuiObjectInfo>;
}

export interface SwapButtonProps {
  control: Control<ISwapForm>;
  mutate: KeyedMutator<never[] | GetObjectDataResponse[]>;
  getValues: UseFormGetValues<ISwapForm>;
  tokenInType: string;
  tokenOutType: string;
  coinsMap: Web3ManagerState['coinsMap'];
}
