import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Table, Typography } from '@/elements';
import { BitcoinSVG, DineroSVG } from '@/svg';

const BorrowTable: FC = () => (
  <Box>
    <Box
      px="L"
      py="XL"
      display="flex"
      alignItems="center"
      justifyContent={['center', 'flex-start']}
    >
      <DineroSVG width="2rem" />
      <Typography variant="normal" ml="M">
        Borrow Dinero
      </Typography>
    </Box>
    <Table
      mobileSide={
        <Box>
          <Box alignItems="center" justifyContent="center">
            <BitcoinSVG width="1.4rem" />
            <Typography variant="normal" ml="M">
              Bitcoin BTC
            </Typography>
          </Box>
          <Button variant="primary" effect="hover">
            Borrow
          </Button>
        </Box>
      }
      headings={[
        <Typography
          display={['none', 'block']}
          variant="normal"
          textAlign="center"
          key={v4()}
          fontSize="S"
        >
          Collateral
        </Typography>,
        'TVL',
        'LTV',
        <>
          <p>Interest Cost</p>
          (APR)
        </>,
        <>
          <p>Liquidation</p>
          Fee
        </>,
        '',
      ]}
      data={[
        [
          <Box
            key={v4()}
            alignItems="center"
            justifyContent="center"
            display={['none', 'flex']}
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
          <Button
            display={['none', 'block']}
            variant="primary"
            key={v4()}
            effect="hover"
          >
            Borrow
          </Button>,
        ],
      ]}
    ></Table>
  </Box>
);

export default BorrowTable;
