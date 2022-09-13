import { BigNumber } from 'ethers';
import { FC, SVGAttributes } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

import { ERC20MetadataWithAddress } from '@/interface';
import { TOKEN_SYMBOL } from '@/sdk';

export type MAILMarketPoolOperation = 'supply' | 'borrow';

export interface IMailMarketPoolData {
  apr: number;
  name: string;
  symbol: string;
  address: string;
  Icon: FC<SVGAttributes<SVGSVGElement>>;
}

export interface IMAILMarketForm {
  search: string;
}

export interface MAILMarketSearchInputProps {
  register: UseFormRegister<IMAILMarketForm>;
}

export interface MAILMarketTableProps {
  popular?: boolean;
  control: Control<IMAILMarketForm>;
}

export interface MAILMarketPoolProps {
  pool: string;
}

export interface MAILMarketPoolInfoProps {
  metadata: ERC20MetadataWithAddress;
}

interface APRData {
  mySupplyRate: BigNumber;
  myBorrowRate: BigNumber;
  net: {
    isPositive: boolean;
    rate: BigNumber;
  };
}

export interface MAILMarketPoolRiskProps {
  loading: boolean;
  risk: number;
}

export interface MAILMarketPoolNetAprProps {
  loading: boolean;
  data: APRData;
}

export interface MAILMarketLoadingProps {
  loading: boolean;
}

export interface MarketMetadata {
  symbol: string | TOKEN_SYMBOL;
  decimals: number;
  name: string;
  tokenAddress: string;
}

export interface TotalBorrowRiskyInUSDRecord {
  totalMaxBorrowAmountInUSD: BigNumber;
  totalBorrowInUSD: BigNumber;
}
