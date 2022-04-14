import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { useIsMounted } from '@/hooks/use-is-mounted';

import Box from '../box';
import Typography from '../typography';
import {
  ResponsiveTableProps,
  TableLoadingProps,
  TableRowProps,
} from './table.types';

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

const TableLoading: FC<TableLoadingProps> = ({ columns }) => (
  <Box
    py="M"
    px="XL"
    role="row"
    key={v4()}
    display="grid"
    alignItems="center"
    gridTemplateColumns={`repeat(${columns}, 1fr)`}
  >
    {Array.from({ length: columns }).map(() => (
      <Cell as="td" key={v4()}>
        <Skeleton />
      </Cell>
    ))}
  </Box>
);

const TableRow: FC<TableRowProps> = ({
  headings,
  hasButton,
  index,
  button,
  ordinate,
  items,
  mobileSide,
}) => (
  <>
    <Box display={['none', 'none', 'none', 'block']}>
      <Box
        py="M"
        px="XL"
        role="row"
        display="grid"
        alignItems="center"
        gridTemplateColumns={`1.5fr repeat(${
          headings.length + (ordinate ? 1 : 0) + (hasButton ? 1 : 0) - 1
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
    </Box>
    <Box display={['block', 'block', 'block', 'none']}>
      <Box display="flex" p="L">
        <Box
          my="L"
          mx="M"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          {mobileSide}
          {!!button && button}
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
              px="M"
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
              px="M"
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
              px="M"
              borderBottom="0.1rem solid"
              borderColor="textDescriptionHigh"
            >
              {index + 1}
            </Box>
          )}
          {items.map((item) => (
            <Box key={v4()} display="flex">
              <Box py="M" px="M">
                {item}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  </>
);

const Table: FC<ResponsiveTableProps> = ({
  data,
  loading,
  ordinate,
  headings,
  hasButton,
}) => {
  const Tooltip = dynamic(() => import('react-tooltip'));
  const isMounted = useIsMounted();

  return (
    <>
      <Box
        my="L"
        width="100%"
        overflow="hidden"
        borderColor="textDescription"
        display={['none', 'none', 'none', 'block']}
      >
        <Box role="table" width="100%" overflowX="auto" overflowY="hidden">
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
            gridTemplateColumns={`1.5fr repeat(${
              headings.length + (ordinate ? 1 : 0) + (hasButton ? 1 : 0) - 1
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
                <TableRow
                  key={v4()}
                  index={index}
                  items={items}
                  button={button}
                  ordinate={ordinate}
                  headings={headings}
                  mobileSide={undefined}
                  hasButton={!!hasButton}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
      <Box
        mx="M"
        my="XL"
        width="100%"
        bg="foreground"
        borderRadius="M"
        display={['block', 'block', 'block', 'none']}
      >
        {data.map(({ items, button, mobileSide }, index) => (
          <TableRow
            key={v4()}
            index={index}
            items={items}
            button={button}
            ordinate={ordinate}
            headings={headings}
            hasButton={!!hasButton}
            mobileSide={mobileSide}
          />
        ))}
      </Box>
      {isMounted.current && (
        <Tooltip place="top" type="dark" effect="solid" multiline />
      )}
    </>
  );
};

export default Table;
