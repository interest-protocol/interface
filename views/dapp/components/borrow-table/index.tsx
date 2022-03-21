import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Table, Typography } from '@/elements';
import { BitcoinSVG } from '@/svg';

const BorrowTable: FC = () => (
  <Box>
    <Table
      headings={[
        <Typography variant="normal" textAlign="center" key={v4()} fontSize="S">
          Collateral
        </Typography>,
        'TVL',
        'LTV',
        <>
          Interest Cost <br />
          (APR)
        </>,
        <>
          Liquidation <br />
          Fee
        </>,
        '',
      ]}
      data={[
        [
          <Box
            key={v4()}
            display="flex"
            alignItems="center"
            justifyContent="cneter"
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
          <Button variant="primary" key={v4()} effect="hover">
            Borrow
          </Button>,
        ],
      ]}
    ></Table>
  </Box>
);

export default BorrowTable;
