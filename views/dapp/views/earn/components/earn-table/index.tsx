import { FC } from 'react';
import { v4 } from 'uuid';

import { getFarmsSVGByToken } from '@/constants';
import { Box, DropdownTable, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import { makeFarmSymbol } from '../../utils';
import {
  DesktopEarnSkeletonRow,
  MobileEarnSkeletonRow,
} from './earn-skeleton-row';
import { EarnTableProps } from './earn-table.types';
import EarnTableCollapsible from './earn-table-collapsible';

const EarnTable: FC<EarnTableProps> = ({
  farms,
  isPools,
  loading,
  isDesktop,
  intUSDPrice,
}) => (
  <Box display="flex" flexDirection="column" flex="1">
    {isDesktop ? (
      <DropdownTable
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
            tip: isPools ? 'Total Value Locked' : 'Liquidity Locked',
            item: (
              <Typography
                as="span"
                cursor="help"
                variant="normal"
                fontSize="inherit"
              >
                {isPools ? 'TVL' : 'Liquidity'}
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
            ? DesktopEarnSkeletonRow
            : farms.map((farm) => ({
                items: [
                  <Box key={v4()} display="flex" alignItems="center">
                    <Box display="inline-flex">
                      {getFarmsSVGByToken(
                        farm.chainId,
                        farm.token0,
                        farm.token1
                      ).map((SVG, index) => (
                        <Box key={v4()} ml={index != 0 ? '-0.5rem' : 'NONE'}>
                          <SVG width="1.6rem" height="1.6rem" />
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
                  farm.tvl,
                  farm.apr,
                  farm.allocation,
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
                dropdown: {
                  args: { farm, intUSDPrice },
                  Component: EarnTableCollapsible,
                },
              }))
        }
      />
    ) : (
      <Box display="flex" alignItems="center">
        <DropdownTable
          key={v4()}
          headings={[
            {
              tip: isPools
                ? 'Total Value Locked'
                : `Liquidity available in this market`,
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  {isPools ? 'TVL' : 'Liquidity'}
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
              : farms.map((farm) => ({
                  sideContent: (
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
                        ).map((SVG, index) => (
                          <Box key={v4()} ml={index != 0 ? '-0.5rem' : 'NONE'}>
                            <SVG width="1.6rem" height="1.6rem" />
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
                  items: [
                    farm.tvl,
                    farm.apr,
                    farm.allocation,
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
                  dropdown: {
                    args: { farm, intUSDPrice },
                    Component: EarnTableCollapsible,
                  },
                }))
          }
        />
      </Box>
    )}
  </Box>
);

export default EarnTable;
