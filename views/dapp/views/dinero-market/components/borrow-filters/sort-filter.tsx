import { always, cond, equals, T } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Dropdown, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import { BorrowSortByFilter, SortFilterProps } from './borrow-filters.types';

const parseFarmSortByEnum = cond([
  [equals(BorrowSortByFilter.Default), always('Select')],
  [equals(BorrowSortByFilter.TVL), always('TVL')],
  [equals(BorrowSortByFilter.LTV), always('LTV')],
  [equals(BorrowSortByFilter.InterestRate), always('Interest Rate')],
  [equals(BorrowSortByFilter.Fee), always('Liquidation Fee')],
  [T, always('Select')],
]);

const SortFilter: FC<SortFilterProps> = ({ control, setValue }) => {
  const sortBy = useWatch({ control, name: 'sortBy' });

  return (
    <Box my={['M', 'M', 'M', 'NONE']} gridColumn={['1', '2']}>
      <Typography
        mb="M"
        as="label"
        fontSize="S"
        variant="normal"
        display="inline-block"
      >
        Sort by:
      </Typography>
      <Box
        display="flex"
        alignItems="stretch"
        flexDirection="column"
        width={['100%', '100%', '100%', '10rem']}
      >
        <Dropdown
          buttonMode
          mode="select"
          bg="accentAlternative"
          bgSelected="accentAlternativeBackground"
          emptyMessage="Not found Tokens"
          suffix={
            <Box
              ml="L"
              width="0.6rem"
              display={['none', 'none', 'none', 'block']}
            >
              <ArrowSVG width="100%" />
            </Box>
          }
          title={
            <Box display="flex" width="100%" py="M" alignItems="center">
              <Typography variant="normal" whiteSpace="nowrap">
                {parseFarmSortByEnum(sortBy)}
              </Typography>
            </Box>
          }
          data={[
            {
              value: 'id',
              displayOption: 'Name',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Name
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', BorrowSortByFilter.Default);
              },
            },
            {
              value: 'tvl',
              displayOption: 'TVL',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    TVL
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', BorrowSortByFilter.TVL);
              },
            },
            {
              value: 'ltv',
              displayOption: 'LTV',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    LTV
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', BorrowSortByFilter.LTV);
              },
            },
            {
              value: 'interestRate',
              displayOption: 'Interest Rate',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Interest Rate
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', BorrowSortByFilter.InterestRate);
              },
            },
            {
              value: 'fee',
              displayOption: 'Liquidation Fee',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Liquidation Fee
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', BorrowSortByFilter.Fee);
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default SortFilter;
