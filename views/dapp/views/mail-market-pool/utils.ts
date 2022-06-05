import { IntMath, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { BLOCKS_PER_YEAR } from '@/sdk';

import {
  MailDataStructOutput,
  MailMetadataStructOutput,
} from '../../../../types/ethers-contracts/InterestViewMAILAbi';

export const processMAILMarketData = (
  rawData:
    | undefined
    | ([MailMetadataStructOutput, MailDataStructOutput[]] & {
        data: MailDataStructOutput[];
      }),
  chainId: number | null
) =>
  rawData && chainId
    ? {
        validId: chainId,
        metadata: {
          isDeployed: rawData[0].isDeployed,
          name: rawData[0].name,
          symbol: rawData[0].symbol,
          token: rawData[0].token,
          predictedAddress: rawData[0].predictedAddress,
        },
        loading: false,
        data: rawData.data,
      }
    : {
        validId: 0,
        metadata: {
          isDeployed: false,
          name: '',
          symbol: '',
          token: ZERO_ADDRESS,
          predictedAddress: ZERO_ADDRESS,
        },
        data: [],
        loading: true,
      };

export const calculateMySupplyAndBorrow = (data: MailDataStructOutput[]) =>
  data.reduce(
    (acc, data) => ({
      mySupply: acc.mySupply.add(
        IntMath.from(data.supply).mul(data.usdPrice).value()
      ),
      myBorrow: acc.myBorrow.add(
        IntMath.from(data.borrow).mul(data.usdPrice).value()
      ),
    }),
    {
      mySupply: ZERO_BIG_NUMBER,
      myBorrow: ZERO_BIG_NUMBER,
    }
  );

export const calculateAPRs = (
  data: MailDataStructOutput[],
  chainId: number
) => {
  const { totalRewardsInUSD, totalOwedInUSD, totalSupplyInUSD } = data.reduce(
    (acc, item) => ({
      totalSupplyInUSD: acc.totalSupplyInUSD.add(
        IntMath.from(item.supply).mul(item.usdPrice).value()
      ),
      totalOwedInUSD: acc.totalOwedInUSD.add(
        IntMath.from(item.borrow)
          .mul(item.borrowRate.mul(BLOCKS_PER_YEAR[chainId] || 0))
          .value()
      ),
      totalRewardsInUSD: acc.totalRewardsInUSD.add(
        IntMath.from(item.supply)
          .mul(item.supplyRate.mul(BLOCKS_PER_YEAR[chainId] || 0))
          .value()
      ),
    }),
    {
      totalSupplyInUSD: ZERO_BIG_NUMBER,
      totalOwedInUSD: ZERO_BIG_NUMBER,
      totalRewardsInUSD: ZERO_BIG_NUMBER,
    }
  );

  return {
    mySupplyRate: IntMath.from(totalRewardsInUSD).div(totalSupplyInUSD).value(),
    myBorrowRate: IntMath.from(totalOwedInUSD).div(totalSupplyInUSD).value(),
    net: {
      isPositive: totalRewardsInUSD.gte(totalOwedInUSD),
      rate: totalRewardsInUSD.gt(totalOwedInUSD)
        ? IntMath.from(totalRewardsInUSD.sub(totalOwedInUSD))
            .div(totalSupplyInUSD)
            .value()
        : IntMath.from(totalOwedInUSD.sub(totalRewardsInUSD))
            .div(totalSupplyInUSD)
            .value(),
    },
  };
};
