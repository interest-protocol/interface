import React, { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import Box from '../box';
import Typography from '../typography';
import { ResponsiveTableProps, TableLoadingProps } from './table.types';

const Cell: FC<{ as: 'td' | 'th' }> = ({ as, children }) => (
  <Box
    py="L"
    px="XL"
    textAlign="left"
    fontWeight="400"
    role={as == 'td' ? 'gridcell' : 'columnheader'}
  >
    {children}
  </Box>
);

const TableLoading: FC<TableLoadingProps> = ({ columns }) => {
  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (rows < 10) {
      const timer = setTimeout(
        () => setRows(rows + Math.random() * 5),
        Math.random() * 2000
      );
      return () => clearTimeout(timer);
    }
  });

  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <Box
          as="tr"
          key={v4()}
          bg={index % 2 == 0 ? 'background' : 'transparent'}
        >
          {Array.from({ length: columns }).map(() => (
            <Box as="td" key={v4()}>
              <Skeleton />
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

const ResponsiveTable: FC<ResponsiveTableProps> = ({
  data,
  loading,
  ordinate,
  headings,
  mobileSide,
}) => (
  <>
    <Box
      my="L"
      overflow="hidden"
      display={['none', 'block']}
      borderColor="textDescription"
    >
      <Box role="table" width="100%" overflowX="auto" borderCollapse="separate">
        <Box
          my="M"
          py="M"
          role="row"
          fontSize="S"
          display="grid"
          bg="foreground"
          borderRadius="L"
          alignItems="center"
          color="textSecondary"
          gridTemplateColumns={`repeat(${
            headings.length + (ordinate ? 1 : 0)
          }, 1fr)`}
        >
          {ordinate && <Cell as="th">Nº</Cell>}
          {headings.map((heading) => (
            <Cell as="th" key={v4()}>
              {heading}
            </Cell>
          ))}
        </Box>
        <Box bg="foreground" borderRadius="L" my="M">
          {loading ? (
            <TableLoading columns={headings.length + (ordinate ? 1 : 0)} />
          ) : (
            data.map((dataItems, index) => (
              <Box
                py="M"
                role="row"
                key={v4()}
                display="grid"
                alignItems="center"
                gridTemplateColumns={`repeat(${
                  headings.length + (ordinate ? 1 : 0)
                }, 1fr)`}
              >
                {ordinate && (
                  <Cell as="td" key={v4()}>
                    {index + 1}
                  </Cell>
                )}
                {dataItems.map((item) => (
                  <Cell as="td" key={v4()}>
                    {item}
                  </Cell>
                ))}
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
    <Box display={['flex', 'none']}>
      {mobileSide}
      {data.map((dataItems, index) => (
        <Box
          mx="L"
          my="XL"
          key={v4()}
          display="grid"
          bg="background"
          borderRadius="M"
          overflow="hidden"
          gridTemplateColumns="auto 1fr"
        >
          {ordinate && (
            <>
              <Typography
                py="M"
                px="L"
                variant="normal"
                textAlign="right"
                fontWeight="bold"
                bg="textDescription"
                borderBottom="0.1rem solid"
                borderColor="textDescriptionHigh"
              >
                Nº
              </Typography>
              <Box
                py="M"
                px="L"
                borderBottom="0.1rem solid"
                borderColor="textDescriptionHigh"
              >
                {index + 1}
              </Box>
            </>
          )}
          {dataItems.map((item, index) => (
            <>
              <Typography
                py="M"
                px="L"
                key={v4()}
                variant="normal"
                textAlign="right"
                fontWeight="bold"
              >
                {headings[index]}
              </Typography>
              <Box py="M" px="L" key={v4()}>
                {item}
              </Box>
            </>
          ))}
        </Box>
      ))}
    </Box>
  </>
);

export default ResponsiveTable;
