import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { getFarmsSVG } from '@/constants';
import { Box, DropdownTable, Typography } from '@/elements';

import {
  DesktopEarnSkeletonRow,
  MobileEarnSkeletonRow,
} from './earn-skeleton-row';
import { EarnTableProps } from './earn-table.types';
import EarnTableCollapsible from './earn-table-collapsible';

const EarnTable: FC<EarnTableProps> = ({
  data,
  isPools,
  intUSDPrice,
  loading,
}) => (
  <Box display="flex" flexDirection="column" flex="1">
    <Container dapp px="M" width="100%">
      <Typography variant="normal" mt="L">
        {isPools ? 'POOL' : 'FARM'}
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
              tip: isPools ? 'Total Value Locked' : 'liquidity locked',
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
          ]}
          data={
            loading
              ? DesktopEarnSkeletonRow
              : data.map(({ farm, allocation, apr, farmTokenPrice, tvl }) => {
                  return {
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
                          {farm.farmName}
                        </Typography>
                      </Box>,
                      tvl,
                      apr,
                      allocation,
                    ],
                    dropdown: (
                      <EarnTableCollapsible
                        intUSDPrice={intUSDPrice}
                        farm={farm}
                        farmTokenPrice={farmTokenPrice}
                      />
                    ),
                  };
                })
          }
        />
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']} alignItems="center">
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
          ]}
          data={
            loading
              ? MobileEarnSkeletonRow
              : data.map(({ farm, tvl, allocation, apr, farmTokenPrice }) => ({
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
                        {farm.farmName}
                      </Typography>
                    </Box>
                  ),
                  items: [tvl, apr, allocation],
                  dropdown: (
                    <EarnTableCollapsible
                      farm={farm}
                      farmTokenPrice={farmTokenPrice}
                      intUSDPrice={intUSDPrice}
                    />
                  ),
                }))
          }
        />
      </Box>
    </Container>
  </Box>
);

export default EarnTable;
