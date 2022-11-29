import { useTranslations } from 'next-intl';
import { always, cond, equals, T } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';

import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Dropdown, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';
import { capitalize } from '@/utils';
import { logEvent } from '@/utils/analytics';

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
        height="3rem"
      >
        <Dropdown
          buttonMode
          mode="select"
          bg="accentAlternative"
          bgSelected="accentAlternativeBackground"
          emptyMessage="Not found Tokens"
          suffix={
            <Box ml="L" width="0.6rem">
              <ArrowSVG width="100%" maxHeight="0.6rem" maxWidth="0.6rem" />
            </Box>
          }
          title={
            <Box display="flex" width="100%" py="XS" alignItems="center">
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
                <Box display="flex" width="100%" py="XS" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Id
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                logEvent(
                  GACategory.DineroMarketFilters,
                  GAAction.Switch,
                  'Sort by: id'
                );
                setValue('sortBy', BorrowSortByFilter.Default);
              },
            },
            {
              value: 'tvl',
              displayOption: 'TVL',
              displayTitle: (
                <Box display="flex" width="100%" py="XS" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    TVL
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                logEvent(
                  GACategory.DineroMarketFilters,
                  GAAction.Switch,
                  'Sort by: tvl'
                );
                setValue('sortBy', BorrowSortByFilter.TVL);
              },
            },
            {
              value: 'ltv',
              displayOption: 'LTV',
              displayTitle: (
                <Box display="flex" width="100%" py="XS" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    LTV
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                logEvent(
                  GACategory.DineroMarketFilters,
                  GAAction.Switch,
                  'Sort by: ltv'
                );
                setValue('sortBy', BorrowSortByFilter.LTV);
              },
            },
            {
              value: 'interestRate',
              displayOption: capitalize(
                t('dineroMarket.filterSortOptionInterestRate')
              ),
              displayTitle: (
                <Box display="flex" width="100%" py="XS" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    {t('dineroMarket.filterSortOptionInterestRate')}
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                logEvent(
                  GACategory.DineroMarketFilters,
                  GAAction.Switch,
                  'Sort by: interestRate'
                );
                setValue('sortBy', BorrowSortByFilter.InterestRate);
              },
            },
            {
              value: 'fee',
              displayOption: capitalize(
                t('dineroMarket.filterSortOptionLiquidationFee')
              ),
              displayTitle: (
                <Box display="flex" width="100%" py="XS" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    {capitalize(
                      t('dineroMarket.filterSortOptionLiquidationFee')
                    )}
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                logEvent(
                  GACategory.DineroMarketFilters,
                  GAAction.Switch,
                  'Sort by: Fee'
                );
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
