import { ethers } from 'ethers';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { CHAIN_ID } from '@/constants/chains';
import { DINERO_MARKET_CONTRACTS } from '@/constants/dinero-market-contracts.data';
import { SECONDS_IN_A_YEAR } from '@/constants/index';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Table, Typography } from '@/elements';
import { useGetDineroMarketErc20Summary } from '@/hooks/use-get-dinero-market-erc20-summary';
import { IntMath } from '@/sdk/entities/int-math';
import { BitcoinSVG, DineroSVG, TimesSVG } from '@/svg';
import { formatDollars } from '@/utils';

import Loading from '../loading';

// Since this is a demo. We do not need to consider the other chains.
const dineroMarketContractAddresses = DINERO_MARKET_CONTRACTS[
  CHAIN_ID.BSC_TEST_NET
].map((x) => x.contract);

const BorrowTable: FC = () => {
  const { data, error } = useGetDineroMarketErc20Summary(
    dineroMarketContractAddresses
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

  if (!data) return <Loading />;

  return (
    <Box display="flex" flexDirection="column" flex="1">
      <Box>
        <Container
          dapp
          py="XL"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent={['center', 'flex-start']}
        >
          <DineroSVG width="2rem" height="2rem" />
          <Typography variant="normal" ml="M">
            Borrow Dinero
          </Typography>
        </Container>
      </Box>
      <Container dapp px="NONE" background="specialBackground">
        <Box display={['none', 'none', 'none', 'block']}>
          <Table
            hasButton
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
            data={DINERO_MARKET_CONTRACTS[CHAIN_ID.BSC_TEST_NET].map(
              (x, index) => ({
                button: (
                  <Link
                    href={`${Routes[RoutesEnum.Borrow]}?mode=borrow&currency=${
                      x.collateral.symbol
                    }`}
                  >
                    <Button variant="primary" hover={{ bg: 'accentActive' }}>
                      Borrow
                    </Button>
                  </Link>
                ),
                items: [
                  <Box
                    key={v4()}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <BitcoinSVG width="1.4rem" height="1.4rem" />
                    <Typography variant="normal" ml="M">
                      {`${x.collateral.name} (${x.collateral.symbol})`}
                    </Typography>
                  </Box>,
                  formatDollars(
                    IntMath.from(data[index].totalCollateral)
                      .mul(data[index].exchangeRate)
                      .toNumber()
                  ),
                  IntMath.from(data[index].ltv).toPercentage(0),
                  IntMath.from(
                    data[index].loan.INTEREST_RATE.mul(SECONDS_IN_A_YEAR)
                  ).toPercentage(2),
                  IntMath.from(data[index].liquidationFee).toPercentage(2),
                ],
              })
            )}
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
            data={DINERO_MARKET_CONTRACTS[CHAIN_ID.BSC_TEST_NET].map(
              (x, index) => ({
                mobileSide: (
                  <Box
                    flex="1"
                    key={v4()}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <BitcoinSVG width="1.4rem" height="1.4rem" />
                    <Typography variant="normal" ml="M" mt="M">
                      {`${x.collateral.name} (${x.collateral.symbol})`}
                    </Typography>
                  </Box>
                ),
                button: (
                  <Link
                    href={`${Routes[RoutesEnum.Borrow]}?mode=borrow&currency=${
                      x.collateral.symbol
                    }`}
                  >
                    <Button
                      key={v4()}
                      variant="primary"
                      hover={{ bg: 'accentActive' }}
                    >
                      Borrow
                    </Button>
                  </Link>
                ),
                items: [
                  formatDollars(
                    IntMath.from(data[index].totalCollateral)
                      .mul(data[index].exchangeRate)
                      .value()
                      .div(ethers.utils.parseEther('1'))
                      .toNumber()
                  ),
                  IntMath.from(data[index].ltv).toPercentage(0),
                  IntMath.from(
                    data[index].loan.INTEREST_RATE.mul(SECONDS_IN_A_YEAR)
                  ).toPercentage(2),
                  IntMath.from(data[index].liquidationFee).toPercentage(2),
                ],
              })
            )}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default BorrowTable;
