import Link from 'next/link';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { getFarmsSVGByToken, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { FixedPointMath, TOKEN_SYMBOL } from '@/sdk';
import { formatDollars, formatMoney, makeFarmSymbol } from '@/utils';

import { handleFilterFarms } from '../../earn.utils';
import {
  DesktopEarnSkeletonRow,
  MobileEarnSkeletonRow,
} from './earn-skeleton-row';
import { EarnTableProps } from './earn-table.types';

const EarnTable: FC<EarnTableProps> = ({
  loading,
  isDesktop,
  control,
  farms,
}) => {
  const onlyFinished = useWatch({ control, name: 'onlyFinished' });
  const onlyStaked = useWatch({ control, name: 'onlyStaked' });

  const typeFilter = useWatch({ control, name: 'typeFilter' });
  const search = useWatch({ control, name: 'search' });
  const sortBy = useWatch({ control, name: 'sortBy' });

  const filteredFarms = handleFilterFarms(
    farms,
    sortBy,
    search,
    typeFilter,
    onlyStaked,
    onlyFinished
  );

  return (
    <Box display="flex" flexDirection="column" flex="1">
      {isDesktop ? (
        <Table
          hasButton
          isDesktop
          headings={[
            {
              item: (
                <Typography
                  as="span"
                  fontSize="S"
                  variant="normal"
                  textAlign="center"
                  display={['none', 'block']}
                >
                  Token
                </Typography>
              ),
            },
            {
              tip: 'Total Value Locked',
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  TVL
                </Typography>
              ),
            },
            {
              tip: 'Staking amount to farm Int',
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  Staking
                </Typography>
              ),
            },
            {
              tip: 'Annual Percentage Rate<br/> yearly interest generated',
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  APR
                </Typography>
              ),
            },
            {
              tip: 'It represents the % of Interest Token minted compared to to others pools.',
              item: <>Allocation</>,
            },
            {
              tip: 'Volatile or Stable.',
              item: <>Type</>,
            },
          ]}
          backgroundColorMap={filteredFarms.map((farm) => ({
            desktopBg: farm.isLive ? 'foreground' : 'bottomBackground',
          }))}
          data={
            loading
              ? DesktopEarnSkeletonRow
              : filteredFarms.map((farm) => ({
                  button: (
                    <Link
                      href={{
                        pathname: Routes[RoutesEnum.EarnFarm],
                        query: { tokenAddress: farm.stakingTokenAddress },
                      }}
                    >
                      <Button
                        as="div"
                        variant="primary"
                        hover={{ bg: 'accentActive' }}
                      >
                        Enter
                      </Button>
                    </Link>
                  ),
                  items: [
                    <Box key={v4()} display="flex" alignItems="center">
                      <Box display="inline-flex">
                        {getFarmsSVGByToken(
                          farm.chainId,
                          farm.token0,
                          farm.token1
                        ).map(({ SVG, highZIndex }, index) => (
                          <Box
                            key={v4()}
                            width="1.6rem"
                            ml={index != 0 ? '-0.5rem' : 'NONE'}
                            zIndex={
                              index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'
                            }
                          >
                            <SVG width="100%" />
                          </Box>
                        ))}
                      </Box>
                      <Typography variant="normal" ml="M">
                        {farm.id === 0
                          ? TOKEN_SYMBOL.INT
                          : makeFarmSymbol(
                              farm.chainId,
                              farm.token0,
                              farm.token1
                            )}
                      </Typography>
                    </Box>,
                    formatDollars(farm.tvl),
                    formatMoney(FixedPointMath.toNumber(farm.stakingAmount)),
                    farm.apr.value().isZero() ? '0%' : farm.apr.toPercentage(),
                    `${
                      farm.allocation.value().isZero()
                        ? '0%'
                        : farm.allocation.toPercentage(2)
                    }`,
                    <Typography
                      variant="normal"
                      fontSize="0.70rem"
                      bg={farm.stable ? 'accent' : 'accentAlternativeActive'}
                      borderRadius="M"
                      p="0.15rem"
                      textAlign="center"
                      cursor="pointer"
                      width="70%"
                      key={v4()}
                    >
                      {farm.stable ? 'Stable' : 'Volatile'}
                    </Typography>,
                  ],
                }))
          }
        />
      ) : (
        <Box display="flex" alignItems="center">
          <Table
            hasButton
            backgroundColorMap={filteredFarms.map((farm) => ({
              bg: farm.isLive ? 'foreground' : 'bottomBackground',
            }))}
            headings={[
              {
                tip: 'Total Value Locked',
                item: (
                  <Typography
                    as="span"
                    cursor="help"
                    variant="normal"
                    fontSize="inherit"
                  >
                    TVL
                  </Typography>
                ),
              },
              {
                tip: 'Staking amount to farm Int',
                item: (
                  <Typography
                    as="span"
                    cursor="help"
                    variant="normal"
                    fontSize="inherit"
                  >
                    Staking
                  </Typography>
                ),
              },
              {
                tip: 'Annual Percentage Rate<br/> yearly interest generated',
                item: (
                  <Typography
                    as="span"
                    cursor="help"
                    variant="normal"
                    fontSize="inherit"
                  >
                    APR
                  </Typography>
                ),
              },
              {
                tip: 'It represents the % of Interest Token minted compared to to others pools.',
                item: <>Allocation</>,
              },
              {
                tip: 'Volatile or Stable.',
                item: <>Type</>,
              },
            ]}
            data={
              loading
                ? MobileEarnSkeletonRow
                : filteredFarms.map((farm) => ({
                    mobileSide: (
                      <Box
                        mb="L"
                        key={v4()}
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Box display="inline-flex">
                          {getFarmsSVGByToken(
                            farm.chainId,
                            farm.token0,
                            farm.token1
                          ).map(({ SVG, highZIndex }, index) => (
                            <Box
                              key={v4()}
                              width="1.6rem"
                              ml={index != 0 ? '-0.5rem' : 'NONE'}
                              zIndex={
                                index == 0
                                  ? highZIndex
                                    ? 3
                                    : 'unset'
                                  : 'unset'
                              }
                            >
                              <SVG width="100%" />
                            </Box>
                          ))}
                        </Box>
                        <Typography
                          mt="M"
                          variant="normal"
                          textAlign="center"
                          whiteSpace="nowrap"
                        >
                          {farm.id === 0
                            ? TOKEN_SYMBOL.INT
                            : makeFarmSymbol(
                                farm.chainId,
                                farm.token0,
                                farm.token1
                              )}
                        </Typography>
                      </Box>
                    ),
                    button: (
                      <Link
                        href={{
                          pathname: Routes[RoutesEnum.EarnFarm],
                          query: { tokenAddress: farm.stakingTokenAddress },
                        }}
                      >
                        <Button
                          as="div"
                          variant="primary"
                          hover={{ bg: 'accentActive' }}
                        >
                          Enter
                        </Button>
                      </Link>
                    ),
                    items: [
                      formatDollars(farm.tvl),
                      formatMoney(FixedPointMath.toNumber(farm.stakingAmount)),
                      farm.apr.value().isZero()
                        ? '0%'
                        : farm.apr.toPercentage(),
                      `${
                        farm.allocation.value().isZero()
                          ? '0%'
                          : farm.allocation.toPercentage(2)
                      }`,
                      <Typography
                        variant="normal"
                        fontSize="0.70rem"
                        bg={farm.stable ? 'accent' : 'accentAlternativeActive'}
                        borderRadius="M"
                        py="XS"
                        px="L"
                        textAlign="center"
                        cursor="pointer"
                        key={v4()}
                      >
                        {farm.stable ? 'Stable' : 'Volatile'}
                      </Typography>,
                    ],
                  }))
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default EarnTable;
