import { useTranslations } from 'next-intl';
import { always, cond, equals, T } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';

import { Box, Dropdown, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';
import { capitalize } from '@/utils';

import { BorrowSortByFilter, SortFilterProps } from './borrow-filters.types';

const parseFarmSortByEnum = cond([
  [equals(BorrowSortByFilter.Default), always('common.select')],
  [equals(BorrowSortByFilter.TVL), always('dineroMarket.tableHeaderTVL')],
  [equals(BorrowSortByFilter.LTV), always('dineroMarket.tableHeaderLTV')],
  [
    equals(BorrowSortByFilter.InterestRate),
    always('dineroMarket.filterSortOptionInterestRate'),
  ],
  [
    equals(BorrowSortByFilter.Fee),
    always('dineroMarket.filterSortOptionLiquidationFee'),
  ],
  [T, always('common.select')],
]);

const SortFilter: FC<SortFilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
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
        {capitalize(t('common.sort'))}:
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
            <Box ml="L" width="0.6rem">
              <ArrowSVG width="100%" />
            </Box>
          }
          title={
            <Box display="flex" width="100%" py="M" alignItems="center">
              <Typography variant="normal" whiteSpace="nowrap">
                {capitalize(
                  t(
                    parseFarmSortByEnum(sortBy) as MessageKeys<
                      IntlMessages,
                      keyof IntlMessages
                    >
                  )
                )}
              </Typography>
            </Box>
          }
          data={[
            {
              value: 'id',
              displayOption: 'Id',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Id
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
              displayOption: capitalize(
                t('dineroMarket.filterSortOptionInterestRate')
              ),
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    {t('dineroMarket.filterSortOptionInterestRate')}
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', BorrowSortByFilter.InterestRate);
              },
            },
            {
              value: 'fee',
              displayOption: capitalize(
                t('dineroMarket.filterSortOptionLiquidationFee')
              ),
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    {capitalize(
                      t('dineroMarket.filterSortOptionLiquidationFee')
                    )}
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
