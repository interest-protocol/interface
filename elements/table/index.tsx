import dynamic from 'next/dynamic';
import React, { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import Box from '../box';
import Typography from '../typography';
import { ResponsiveTableProps, TableLoadingProps } from './table.types';

const Cell: FC<{ as: 'td' | 'th'; tip?: string }> = ({ as, tip, children }) => (
  <Box
    py="L"
    px="M"
    data-tip={tip}
    textAlign="left"
    fontWeight="400"
    {...(tip && { cursor: 'help' })}
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
    <Box>
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
    </Box>
  );
};

const ResponsiveTable: FC<ResponsiveTableProps> = ({
  data,
  loading,
  ordinate,
  headings,
  hasButton,
}) => {
  const Tooltip = dynamic(() => import('react-tooltip'));

  return (
    <>
      <Box
        my="L"
        overflow="hidden"
        borderColor="textDescription"
        display={['none', 'none', 'none', 'block']}
      >
        <Box role="table" width="100%" overflowX="auto">
          <Box
            my="M"
            py="M"
            px="XL"
            role="row"
            fontSize="S"
            display="grid"
            bg="foreground"
            borderRadius="L"
            alignItems="center"
            color="textSecondary"
            gridTemplateColumns={`repeat(${
              headings.length + (ordinate ? 1 : 0) + (hasButton ? 1 : 0)
            }, 1fr)`}
          >
            {ordinate && <Cell as="th">Nº</Cell>}
            {headings.map(({ item, tip }) => (
              <Cell as="th" key={v4()} tip={tip}>
                {item}
              </Cell>
            ))}
            {hasButton && <Cell as="th" />}
          </Box>
          <Box bg="foreground" borderRadius="L" my="M">
            {loading ? (
              <TableLoading
                columns={
                  headings.length + (ordinate ? 1 : 0) + (hasButton ? 1 : 0)
                }
              />
            ) : (
              data.map(({ items, button }, index) => (
                <Box
                  py="M"
                  px="XL"
                  role="row"
                  key={v4()}
                  display="grid"
                  alignItems="center"
                  gridTemplateColumns={`repeat(${
                    headings.length + (ordinate ? 1 : 0) + (hasButton ? 1 : 0)
                  }, 1fr)`}
                >
                  {ordinate && (
                    <Cell as="td" key={v4()}>
                      {index + 1}
                    </Cell>
                  )}
                  {items.map((item) => (
                    <Cell as="td" key={v4()}>
                      {item}
                    </Cell>
                  ))}
                  {button && <Cell as="td">{button}</Cell>}
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
      <Box
        p="L"
        mx="M"
        my="XL"
        bg="foreground"
        borderRadius="M"
        display={['block', 'block', 'block', 'none']}
      >
        {data.map(({ items, button, mobileSide }, index) => (
          <Box key={v4()} display="flex">
            <Box
              my="L"
              mx="M"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              {mobileSide}
              {button}
            </Box>
            <Box
              key={v4()}
              display="grid"
              borderRadius="M"
              overflow="hidden"
              gridAutoFlow="column"
              gridTemplateRows={`repeat(${
                headings.length + (ordinate ? 1 : 0)
              }, 1fr)`}
            >
              {ordinate && (
                <Typography
                  py="M"
                  px="L"
                  fontSize="S"
                  variant="normal"
                  color="textSecondary"
                >
                  Nº
                </Typography>
              )}
              {headings.map(({ item }) => (
                <Typography
                  py="M"
                  px="L"
                  key={v4()}
                  fontSize="S"
                  variant="normal"
                  color="textSecondary"
                >
                  {item}
                </Typography>
              ))}
              {ordinate && (
                <Box
                  py="M"
                  px="L"
                  borderBottom="0.1rem solid"
                  borderColor="textDescriptionHigh"
                >
                  {index + 1}
                </Box>
              )}
              {items.map((item) => (
                <Box key={v4()} display="flex">
                  <Box py="M" px="L">
                    {item}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Tooltip place="top" type="dark" effect="solid" multiline />
    </>
  );
};
export default ResponsiveTable;
