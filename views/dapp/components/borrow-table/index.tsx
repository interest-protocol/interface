import Container from 'components/container';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Table, Typography } from '@/elements';
import { BitcoinSVG, DineroSVG } from '@/svg';

const BorrowTable: FC = () => (
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
      <Box display={['none', 'block']}>
        <Table
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
                  href={`${Routes[RoutesEnum.Borrow]}?mode=borrow&currency=BNB`}
                >
                  <Button variant="primary">Borrow</Button>
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
                    Bitcoin BTC
                  </Typography>
                </Box>,
                '8.45K',
                '60%',
                '3%',
                '10%',
              ],
            },
          ]}
        />
      </Box>
      <Box display={['flex', 'none']} alignItems="center" bg="">
        <Table
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
                Bitcoin BTC
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
                  href={`${Routes[RoutesEnum.Borrow]}?mode=borrow&currency=BNB`}
                >
                  <Button variant="primary" key={v4()}>
                    Borrow
                  </Button>
                </Link>
              ),
              items: ['8.45K', '60%', '3%', '10%'],
            },
          ]}
        />
      </Box>
    </Container>
  </Box>
);

export default BorrowTable;
