import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Container } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import {
  useGetPairData,
  useIdAccount,
  useLocale,
  useNativeBalance,
} from '@/hooks';
import { ZERO_BIG_NUMBER } from '@/sdk';
import { FixedPointMath } from '@/sdk';
import { TimesSVG } from '@/svg';
import { formatMoney } from '@/utils';

import GoBack from '../../components/go-back';
import {
  AddLiquidityCard,
  LiquidityDetailsCard,
  RemoveLiquidityCard,
} from './components';
import HeaderSkeleton from './components/skeleton/header';
import { DEXPoolDetailsViewProps } from './dex-pool-details.types';
import { processPairData } from './utils';

const DEXPoolDetailsView: FC<DEXPoolDetailsViewProps> = ({ pairAddress }) => {
  const t = useTranslations();

  const { currentLocale } = useLocale();

  const { error, data, refetch } = useGetPairData(pairAddress);
  const { chainId, account } = useIdAccount();
  const { data: balanceData, refetch: refetchNativeBalance } =
    useNativeBalance();

  const DefaultIcon = TOKENS_SVG_MAP[chainId].default;

  const nativeBalance = balanceData
    ? balanceData.toString()
    : ZERO_BIG_NUMBER.toString();

  const processedData = useMemo(
    () => processPairData(chainId, data, nativeBalance),
    [chainId, data, nativeBalance]
  );

  const FirstIcon =
    TOKENS_SVG_MAP[chainId][processedData.token0] ?? DefaultIcon;

  const SecondIcon =
    TOKENS_SVG_MAP[chainId][processedData.token1] ?? DefaultIcon;

  const addLiquidityTokens = useMemo(
    () => [
      {
        symbol: processedData.token0Metadata.symbol,
        Icon: (
          <Box as="span" display="inline-flex" width="1rem">
            <FirstIcon width="100%" />
          </Box>
        ),
        balance: processedData.token0Balance,
        allowance: processedData.token0Allowance,
        decimals: processedData.token0Metadata.decimals,
        address: processedData.token0,
      },
      {
        symbol: processedData.token1Metadata.symbol,
        Icon: (
          <Box as="span" display="inline-flex" width="1rem">
            <SecondIcon width="100%" />
          </Box>
        ),
        balance: processedData.token1Balance,
        allowance: processedData.token1Allowance,
        decimals: processedData.token1Metadata.decimals,
        address: processedData.token1,
      },
    ],
    [chainId, data]
  );

  const removeLiquidityTokens = useMemo(
    () => [
      {
        symbol: processedData.token0Metadata.symbol,
        Icon: processedData.loading ? (
          <Box
            as="span"
            width="1rem"
            borderRadius="2rem"
            display="inline-block"
          >
            <Skeleton height="100%" borderRadius="2rem" />
          </Box>
        ) : (
          <Box as="span" display="inline-block" width="1rem">
            <FirstIcon width="100%" />
          </Box>
        ),
        address: processedData.token0,
        decimals: processedData.token0Metadata.decimals,
      },
      {
        symbol: processedData.token1Metadata.symbol,
        Icon: processedData.loading ? (
          <Box
            as="span"
            width="1rem"
            borderRadius="2rem"
            display="inline-block"
          >
            <Skeleton height="100%" borderRadius="2rem" />
          </Box>
        ) : (
          <Box as="span" display="inline-block" width="1rem">
            <SecondIcon width="100%" />
          </Box>
        ),
        address: processedData.token1,
        decimals: processedData.token1Metadata.decimals,
      },
    ],
    [chainId, processedData]
  );

  if (error)
    return (
      <Box
        my="XXXL"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box color="error">
          <TimesSVG width="10rem" />
        </Box>
        <Typography variant="normal">
          {t('dexPoolPairAddress.error.pairData')}
        </Typography>
      </Box>
    );

  if (!processedData.pairExists)
    return (
      <Box
        my="XXXL"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box color="error">
          <TimesSVG width="10rem" />
        </Box>
        <Typography variant="normal">
          {t('dexPoolPairAddress.error.pairDoesNotExist', { pairAddress })}
        </Typography>
      </Box>
    );

  return (
    <Container dapp mt="XXL" width="100%">
      <GoBack routeBack />
      <Box display="flex" alignItems="center">
        {processedData.loading ? (
          <HeaderSkeleton />
        ) : (
          <>
            <FirstIcon width="2rem" />
            <SecondIcon width="2rem" />
            <Typography variant="normal" ml="L" textTransform="capitalize">
              {processedData.token0Metadata.symbol +
                ' - ' +
                processedData.token1Metadata.symbol +
                ' ' +
                t('dexPoolPairAddress.title', {
                  currentLocale,
                  type: t(
                    processedData.isStable
                      ? 'common.stable'
                      : 'common.volatile',
                    { count: 1 }
                  ),
                })}
            </Typography>
          </>
        )}
      </Box>
      <Box
        mt="XL"
        color="text"
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        <LiquidityDetailsCard
          isStable={processedData.isStable}
          lines={[
            {
              address: processedData.token0,
              symbol: processedData.token0Metadata.symbol,
              value: formatMoney(
                FixedPointMath.toNumber(
                  processedData.reserve0,
                  processedData.token0Metadata.decimals
                )
              ),
              isFetchingInitialData: processedData.loading,
            },
            {
              address: processedData.token1,
              symbol: processedData.token1Metadata.symbol,
              value: formatMoney(
                FixedPointMath.toNumber(
                  processedData.reserve1,
                  processedData.token1Metadata.decimals
                )
              ),
              isFetchingInitialData: processedData.loading,
            },
          ]}
        />
        <AddLiquidityCard
          fetchingInitialData={processedData.loading}
          isStable={processedData.isStable}
          tokens={addLiquidityTokens}
          refetch={async () =>
            void (await Promise.all([refetch(), refetchNativeBalance()]))
          }
        />
        <RemoveLiquidityCard
          chainId={chainId}
          account={account}
          pairAddress={pairAddress}
          isFetchingInitialData={processedData.loading}
          isStable={processedData.isStable}
          lpAllowance={processedData.lpAllowance}
          lpBalance={processedData.lpBalance}
          tokens={removeLiquidityTokens}
          refetch={async () =>
            void (await Promise.all([refetch(), refetchNativeBalance()]))
          }
        />
      </Box>
    </Container>
  );
};

export default DEXPoolDetailsView;
