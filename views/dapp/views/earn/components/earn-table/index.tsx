import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import {
  BSC_TEST_ERC_20_DATA,
  getFarmsSVG,
  TOKEN_SYMBOL,
} from '@/constants/erc-20';
import { PoolType } from '@/constants/farms';
import { Box, DropdownTable, Typography } from '@/elements';
import {
  calculateAllocation,
  calculateFarmBaseAPR,
  calculateTVL,
} from '@/utils/casa-de-papel';

import {
  DesktopEarnSkeletonRow,
  MobileEarnSkeletonRow,
} from './earn-skeleton-row';
import { EarnTableProps } from './earn-table.types';
import EarnTableCollapsible from './earn-table-collapsible';

const EarnTable: FC<EarnTableProps> = ({
  type,
  farms,
  loading,
  intPerBlock,
  baseTokenPrice,
}) => {
  const isFarm = type === PoolType.Farm;

  return (
    <Box display="flex" flexDirection="column" flex="1">
      <Container dapp px="M" width="100%">
        <Typography variant="normal" mt="L">
          {type === PoolType.Farm ? 'FARM' : 'POOL'}
        </Typography>
        <Box display={['none', 'none', 'none', 'block']}>
          <DropdownTable
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
                tip: isFarm
                  ? `Liquidity available in this market`
                  : 'Total Value Locked',
                item: (
                  <Typography
                    as="span"
                    cursor="help"
                    variant="normal"
                    fontSize="inherit"
                  >
                    {isFarm ? 'Liquidity' : 'TVL'}
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
            ]}
            data={
              loading
                ? DesktopEarnSkeletonRow
                : farms.map((farm) => ({
                    items: [
                      <Box
                        key={v4()}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box display="inline-flex">
                          {getFarmsSVG(farm.id).map((SVG, index) => (
                            <Box
                              key={v4()}
                              zIndex={getFarmsSVG(farm.id).length - index}
                              ml={index != 0 ? '-0.5rem' : 'NONE'}
                            >
                              <SVG width="1.6rem" height="1.6rem" />
                            </Box>
                          ))}
                        </Box>
                        <Typography variant="normal" ml="M">
                          {farm.name}
                        </Typography>
                      </Box>,
                      calculateTVL(
                        baseTokenPrice,
                        BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC].address,
                        farm
                      ),
                      calculateFarmBaseAPR(
                        intPerBlock,
                        baseTokenPrice,
                        BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC].address,
                        farm
                      ),
                      calculateAllocation(farm),
                    ],
                    dropdown: (
                      <EarnTableCollapsible
                        symbol={farm.symbol}
                        availableAmount={0.000000000001}
                        availableAmountUSD={0.0001}
                        stakeRequestApproval
                        stakedAmount={0.000000000001}
                        stakedAmountUSD={0.0001}
                        earnedAmount={0}
                        earnedAmountUSD={0}
                      />
                    ),
                  }))
            }
          />
        </Box>
        <Box display={['flex', 'flex', 'flex', 'none']} alignItems="center">
          <DropdownTable
            key={v4()}
            headings={[
              {
                tip: isFarm
                  ? `Liquidity available in this market`
                  : 'Total Value Locked',
                item: (
                  <Typography
                    as="span"
                    cursor="help"
                    variant="normal"
                    fontSize="inherit"
                  >
                    {isFarm ? 'Liquidity' : 'TVL'}
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
                          {getFarmsSVG(farm.id).map((SVG, index) => (
                            <Box
                              key={v4()}
                              zIndex={getFarmsSVG(farm.id).length - index}
                              ml={index != 0 ? '-0.5rem' : 'NONE'}
                            >
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
                          {farm.name}
                        </Typography>
                      </Box>
                    ),
                    items: [
                      calculateTVL(
                        baseTokenPrice,
                        BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC].address,
                        farm
                      ),
                      calculateFarmBaseAPR(
                        intPerBlock,
                        baseTokenPrice,
                        BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.BTC].address,
                        farm
                      ),
                      calculateAllocation(farm),
                    ],
                    dropdown: (
                      <EarnTableCollapsible
                        symbol={farm.symbol}
                        availableAmount={0.000000000001}
                        availableAmountUSD={0.0001}
                        stakeRequestApproval
                        stakedAmount={0.000000000001}
                        stakedAmountUSD={0.0001}
                        earnedAmount={0}
                        earnedAmountUSD={0}
                      />
                    ),
                  }))
            }
          />
        </Box>
      </Container>
    </Box>
  );
};

export default EarnTable;
