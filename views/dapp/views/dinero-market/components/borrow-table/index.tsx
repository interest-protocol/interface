import { BigNumber } from 'ethers';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { v4 } from 'uuid';

import { getDineroMarketSVGBySymbol, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { useChainId, useGetDineroMarketsSummaryV2 } from '@/hooks';
import { IntMath, SECONDS_IN_A_YEAR } from '@/sdk';
import { TimesSVG } from '@/svg';
import { formatDollars } from '@/utils';

import Loading from '../../../../components/loading';
import { getSafeDineroMarketSummaryData } from '../../dinero-market.utils';

const BorrowTable: FC = () => {
  const { data, error } = useGetDineroMarketsSummaryV2();
  const chainId = useChainId();

  const markets = useMemo(
    () => getSafeDineroMarketSummaryData(chainId, data),
    [data, chainId]
  );

  if (error)
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          mb="L"
          width="10rem"
          height="10rem"
          color="error"
          overflow="hidden"
          borderRadius="50%"
          border="0.3rem solid"
        >
          <TimesSVG width="100%" height="100%" />
        </Box>
        <Typography variant="title3">Error fetching the contracts</Typography>
      </Box>
    );

  if (!data || !chainId) return <Loading />;

  return (
    <>
      <Box display={['none', 'none', 'none', 'block']}>
        <Table
          hasButton
          separated
          key={v4()}
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
                  Collateral
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
              tip: 'Loan to Value',
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  LTV
                </Typography>
              ),
            },
            {
              tip: 'The annual cost of a loan to a borrower, <br /> expressed as a percentage',
              item: (
                <>
                  Interest Cost <br />
                  (APR)
                </>
              ),
            },
            {
              tip: 'A penalty fee charged to a borrower when his/her position is liquidated.<br />It is expressed as a percentage of the loan',
              item: (
                <>
                  Liquidation <br />
                  Fee
                </>
              ),
            },
          ]}
          data={markets.map((x) => {
            return {
              button: (
                <Link
                  href={{
                    pathname: Routes[RoutesEnum.DineroMarketBorrow],
                    query: { address: x.marketAddress },
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
                  {getDineroMarketSVGBySymbol(
                    chainId,
                    x.symbol0,
                    x.symbol1
                  ).map(({ SVG, highZIndex }, index) => (
                    <Box
                      mr="M"
                      key={v4()}
                      width="1.6rem"
                      ml={index != 0 ? '-1rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" />
                    </Box>
                  ))}
                  <Typography variant="normal" ml="M">
                    {x.name}
                  </Typography>
                </Box>,
                formatDollars(
                  IntMath.from(
                    x.collateralAmount
                      .mul(x.collateralUSDPrice)
                      .div(BigNumber.from(10).pow(x.collateralDecimals))
                  ).toNumber()
                ),
                IntMath.from(x.LTV).toPercentage(0),
                x.interestRate.isZero()
                  ? 'N/A'
                  : IntMath.from(
                      x.interestRate.mul(SECONDS_IN_A_YEAR)
                    ).toPercentage(2),
                IntMath.from(x.liquidationFee).toPercentage(2),
              ],
            };
          })}
        />
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']} alignItems="center">
        <Table
          key={v4()}
          headings={[
            {
              item: (
                <Typography
                  as="span"
                  key={v4()}
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                  data-tip="TVL info"
                >
                  TVL
                </Typography>
              ),
            },
            {
              item: (
                <Typography
                  as="span"
                  key={v4()}
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                  data-tip="LTV info"
                >
                  LTV
                </Typography>
              ),
            },
            {
              item: (
                <>
                  Interest Cost <br />
                  (APR)
                </>
              ),
            },
            {
              item: (
                <>
                  Liquidation <br />
                  Fee
                </>
              ),
            },
          ]}
          data={markets.map((x) => {
            return {
              mobileSide: (
                <Box
                  flex="1"
                  key={v4()}
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                >
                  {getDineroMarketSVGBySymbol(
                    chainId,
                    x.symbol0,
                    x.symbol1
                  ).map(({ SVG, highZIndex }, index) => (
                    <Box
                      mr="M"
                      key={v4()}
                      width="1.6rem"
                      ml={index != 0 ? '-1rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" />
                    </Box>
                  ))}
                  <Typography variant="normal" textAlign="center" mt="M">
                    {x.name}
                  </Typography>
                </Box>
              ),
              button: (
                <Link
                  href={{
                    pathname: Routes[RoutesEnum.DineroMarketBorrow],
                    query: { address: x.marketAddress },
                  }}
                >
                  <Button
                    key={v4()}
                    as="div"
                    variant="primary"
                    hover={{ bg: 'accentActive' }}
                  >
                    Enter
                  </Button>
                </Link>
              ),
              items: [
                formatDollars(
                  IntMath.from(
                    x.collateralAmount
                      .mul(x.collateralUSDPrice)
                      .div(BigNumber.from(10).pow(x.collateralDecimals))
                  ).toNumber()
                ),
                IntMath.from(x.LTV).toPercentage(0),
                x.interestRate.isZero()
                  ? 'N/A'
                  : IntMath.from(
                      x.interestRate.mul(SECONDS_IN_A_YEAR)
                    ).toPercentage(2),
                IntMath.from(x.liquidationFee).toPercentage(2),
              ],
            };
          })}
        />
      </Box>
    </>
  );
};

export default BorrowTable;
