import { MAIL_BRIDGE_TOKENS_ARRAY } from '@/constants';
import { ERC20MetadataWithAddress } from '@/interface';
import { IntMath, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { BLOCKS_PER_YEAR } from '@/sdk';

import {
  ERC20MetadaStructOutput,
  MailDataStructOutput,
} from '../../../../types/ethers-contracts/InterestViewMAILAbi';
import {
  MarketMetadata,
  TotalBorrowRiskyInUSDRecord,
} from './mail-market-pool.types';

export const processMAILMarketData = (
  rawData:
    | undefined
    | ([ERC20MetadaStructOutput, MailDataStructOutput[]] & {
        data: MailDataStructOutput[];
      }),
  chainId: number | null
) =>
  rawData && chainId
    ? {
        validId: chainId,
        metadata: {
          decimals: rawData[0].decimals,
          name: rawData[0].name,
          symbol: rawData[0].symbol,
          address: rawData[0].token,
        },
        loading: false,
        data: rawData.data,
      }
    : {
        validId: 0,
        metadata: {
          name: '',
          symbol: '',
          address: ZERO_ADDRESS,
          decimals: ZERO_BIG_NUMBER,
        },
        data: [],
        loading: true,
      };

export const calculateMySupply = (data: MailDataStructOutput[]) =>
  data.reduce(
    (acc, data) =>
      acc.add(IntMath.from(data.supply).mul(data.usdPrice).value()),
    ZERO_BIG_NUMBER
  );

export const calculateTotalBorrowsInUSD = (
  data: MailDataStructOutput[]
): TotalBorrowRiskyInUSDRecord =>
  data.reduce(
    (acc, item) => ({
      totalMaxBorrowAmountInUSD: acc.totalMaxBorrowAmountInUSD.add(
        IntMath.from(item.supply).mul(item.usdPrice).mul(item.ltv).value()
      ),
      totalBorrowInUSD: acc.totalBorrowInUSD.add(
        IntMath.from(item.borrow).mul(item.usdPrice).value()
      ),
    }),
    {
      totalMaxBorrowAmountInUSD: ZERO_BIG_NUMBER,
      totalBorrowInUSD: ZERO_BIG_NUMBER,
    }
  );

export const calculatePoolRisk = ({
  totalBorrowInUSD,
  totalMaxBorrowAmountInUSD,
}: TotalBorrowRiskyInUSDRecord) =>
  Math.ceil(
    IntMath.from(totalBorrowInUSD).div(totalMaxBorrowAmountInUSD).toNumber() *
      100
  );

const getTotalsInUSD = (data: MailDataStructOutput[], chainId: number) =>
  data.reduce(
    (acc, item) => ({
      totalSupplyInUSD: acc.totalSupplyInUSD.add(
        IntMath.from(item.supply).mul(item.usdPrice).value()
      ),
      totalBorrowInUSD: acc.totalBorrowInUSD.add(
        IntMath.from(item.borrow).mul(item.usdPrice).value()
      ),
      totalOwedInUSD: acc.totalOwedInUSD.add(
        IntMath.from(item.borrow)
          .mul(item.borrowRate.mul(BLOCKS_PER_YEAR[chainId] || 0))
          .mul(item.usdPrice)
          .value()
      ),
      totalRewardsInUSD: acc.totalRewardsInUSD.add(
        IntMath.from(item.supply)
          .mul(item.supplyRate.mul(BLOCKS_PER_YEAR[chainId] || 0))
          .mul(item.usdPrice)
          .value()
      ),
    }),
    {
      totalSupplyInUSD: ZERO_BIG_NUMBER,
      totalBorrowInUSD: ZERO_BIG_NUMBER,
      totalOwedInUSD: ZERO_BIG_NUMBER,
      totalRewardsInUSD: ZERO_BIG_NUMBER,
    }
  );

export const calculateAPRs = (
  data: MailDataStructOutput[],
  chainId: number
) => {
  const {
    totalRewardsInUSD,
    totalOwedInUSD,
    totalSupplyInUSD,
    totalBorrowInUSD,
  } = getTotalsInUSD(data, chainId);

  return {
    mySupplyRate: IntMath.from(totalRewardsInUSD).div(totalSupplyInUSD).value(),
    myBorrowRate: IntMath.from(totalOwedInUSD).div(totalSupplyInUSD).value(),
    net: {
      isPositive: totalRewardsInUSD.gte(totalOwedInUSD),
      rate: totalRewardsInUSD.gt(totalOwedInUSD)
        ? IntMath.from(totalRewardsInUSD.sub(totalOwedInUSD))
            .div(totalSupplyInUSD.sub(totalBorrowInUSD))
            .value()
        : IntMath.from(totalOwedInUSD.sub(totalRewardsInUSD))
            .div(totalSupplyInUSD.sub(totalBorrowInUSD))
            .value(),
    },
  };
};

export const processMarkets = (
  data: MailDataStructOutput[],
  metadata: ERC20MetadataWithAddress,
  chainId: number
) =>
  data.reduce(
    (acc, item, index) => {
      const bridgeTokensArray = MAIL_BRIDGE_TOKENS_ARRAY[chainId];

      if (!bridgeTokensArray.length) return acc;

      const record = bridgeTokensArray[index];

      if (!record && index > 4) return acc;

      const info =
        index === 4
          ? {
              ...item,
              borrowRate: item.borrowRate.mul(BLOCKS_PER_YEAR[chainId] || 0),
              supplyRate: item.supplyRate.mul(BLOCKS_PER_YEAR[chainId] || 0),
              symbol: metadata.symbol,
              // decimals should not throw
              decimals: metadata.decimals.toNumber(),
              name: metadata.name,
              tokenAddress: metadata.address,
            }
          : {
              ...item,
              borrowRate: item.borrowRate.mul(BLOCKS_PER_YEAR[chainId] || 0),
              supplyRate: item.supplyRate.mul(BLOCKS_PER_YEAR[chainId] || 0),
              symbol: record.symbol,
              decimals: record.decimals,
              name: record.name,
              tokenAddress: record.address,
            };

      if (item.borrow.isZero()) {
        acc.borrowMarkets = acc.borrowMarkets.concat([info]);
      } else {
        acc.activeBorrowMarkets = acc.activeBorrowMarkets.concat([info]);
      }

      if (item.supply.isZero()) {
        acc.supplyMarkets = acc.supplyMarkets.concat([info]);
      } else {
        acc.activeSupplyMarkets = acc.activeSupplyMarkets.concat([info]);
      }

      return acc;
    },
    {
      borrowMarkets: [] as ReadonlyArray<MailDataStructOutput & MarketMetadata>,
      supplyMarkets: [] as ReadonlyArray<MailDataStructOutput & MarketMetadata>,
      activeBorrowMarkets: [] as ReadonlyArray<
        MailDataStructOutput & MarketMetadata
      >,
      activeSupplyMarkets: [] as ReadonlyArray<
        MailDataStructOutput & MarketMetadata
      >,
    }
  );
