import Container from 'components/container';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import priorityHooks from '@/connectors';
import { DINERO_MARKET_CONTRACTS } from '@/constants/dinero-market-contracts.data';
import { SECONDS_IN_A_YEAR } from '@/constants/index';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Table, Typography } from '@/elements';
import { useGetDineroMarketErc20Summary } from '@/hooks/use-get-dinero-market-erc20-summary';
import { CHAIN_ID, getChainId } from '@/sdk/chains';
import { IntMath } from '@/sdk/entities/int-math';
import { BitcoinSVG, DineroSVG, MetaMaskSVG, TimesSVG } from '@/svg';
import { formatDollars } from '@/utils';

import Advertising from '../advertising';
import Loading from '../loading';

const { usePriorityChainId } = priorityHooks;

// Since this is a demo. We do not need to consider the other chains.
const dineroMarketContractAddresses = DINERO_MARKET_CONTRACTS[
  CHAIN_ID.BSC_TEST_NET
].map((x) => x.contract);

const BorrowTable: FC = () => {
  const chainId = usePriorityChainId();

  const { data, error } = useGetDineroMarketErc20Summary(
    dineroMarketContractAddresses
  );

  if (!chainId)
    return (
      <Advertising
        Icon={MetaMaskSVG}
        title="Disconnected"
        lines={[<>Please, connect the wallet.</>]}
      />
    );

  if (!!chainId && getChainId(chainId) === CHAIN_ID.BSC_MAIN_MET)
    return (
      <Advertising
        title="Coming Soon"
        lines={[
          <>
            Sorry, we are working on <strong>BSC Main Net</strong>.
          </>,
          <>
            Please, switch to <strong>BSC Test Net</strong>.
          </>,
        ]}
      />
    );

  if (!!chainId && getChainId(chainId) === CHAIN_ID.UNSUPPORTED)
    return (
      <Advertising
        Icon={TimesSVG}
        title="Not supported"
        lines={[
          'This chain is not supported',
          'Please, switch a supported chain',
        ]}
      />
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
          <TimesSVG />
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
          <DineroSVG width="2rem" />
          <Typography variant="normal" ml="M">
            Borrow Dinero
          </Typography>
        </Container>
      </Box>
      <Container dapp px="NONE" background="specialBackground">
        <Box display={['none', 'none', 'none', 'block']}>
          {DINERO_MARKET_CONTRACTS[CHAIN_ID.BSC_TEST_NET].map((x, index) => (
            <Table
              key={v4()}
              hasButton
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
                  tip: 'This fee is added to the debt every time <br />the user borrows DNR',
                  item: (
                    <>
                      Interest Cost <br />
                      (APR)
                    </>
                  ),
                },
                {
                  tip: 'This is the discount a liquidator gets when <br />buying collateral for liquidation',
                  item: (
                    <>
                      Liquidation <br />
                      Fee
                    </>
                  ),
                },
              ]}
              data={[
                {
                  button: (
                    <Link
                      href={`${
                        Routes[RoutesEnum.Borrow]
                      }?mode=borrow&currency=BNB`}
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
                      <BitcoinSVG width="1.4rem" />
                      <Typography variant="normal" ml="M">
                        {`${x.collateral.name} (${x.collateral.symbol})`}
                      </Typography>
                    </Box>,
                    formatDollars(
                      IntMath.from(data[index].totalCollateral)
                        .mul(data[index].exchangeRate)
                        .value()
                        .toNumber()
                    ),
                    IntMath.toPercentage(data[index].ltv),
                    IntMath.toPercentage(
                      data[index].loan.INTEREST_RATE.mul(SECONDS_IN_A_YEAR)
                    ),
                    IntMath.toPercentage(data[index].liquidationFee),
                  ],
                },
              ]}
            />
          ))}
        </Box>
        <Box display={['flex', 'flex', 'flex', 'none']} alignItems="center">
          {/* { ( */}
          {DINERO_MARKET_CONTRACTS[CHAIN_ID.BSC_TEST_NET].map((x, index) => (
            <Table
              key={v4()}
              mobileSide={
                <Box
                  flex="1"
                  key={v4()}
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <BitcoinSVG width="1.4rem" />
                  <Typography variant="normal" ml="M" mt="M">
                    {`${x.collateral.name} (${x.collateral.symbol})`}
                  </Typography>
                </Box>
              }
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
              data={[
                {
                  button: (
                    <Link
                      href={`${
                        Routes[RoutesEnum.Borrow]
                      }?mode=borrow&currency=BNB`}
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
                        .toNumber()
                    ),
                    IntMath.toPercentage(data[index].ltv),
                    IntMath.toPercentage(
                      data[index].loan.INTEREST_RATE.mul(SECONDS_IN_A_YEAR)
                    ),
                    IntMath.toPercentage(data[index].liquidationFee),
                  ],
                },
              ]}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BorrowTable;
