import Container from 'components/container';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Table, Typography } from '@/elements';
import { BitcoinSVG, DineroSVG } from '@/svg';

const BorrowTable: FC = () => (
  <Box display="flex" flexDirection="column" flex="1">
    <Box bg="foreground">
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
                  display={['none', 'block']}
                  variant="normal"
                  textAlign="center"
                  key={v4()}
                  fontSize="S"
                >
                  Collateral
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
                <Button variant="primary" key={v4()}>
                  Borrow
                </Button>
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
                <Button variant="primary" key={v4()}>
                  Borrow
                </Button>
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
