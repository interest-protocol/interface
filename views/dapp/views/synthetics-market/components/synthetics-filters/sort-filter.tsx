import { useTranslations } from 'next-intl';
import { always, cond, equals, T } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { GAAction, GACategory } from '@/constants/google-analytics';
import { Box, Dropdown, Typography } from '@/elements';
import { TTranslatedMessage } from '@/interface';
import { ArrowSVG } from '@/svg';
import { capitalize } from '@/utils';
import { logEvent } from '@/utils/analytics';

import { SyntheticMarketSortByFilter } from '../../synthetics-market.types';
import { SortFilterProps } from './synthetics-filters.types';

const parseFarmSortByEnum = cond([
  [equals(SyntheticMarketSortByFilter.Default), always('common.select')],
  [
    equals(SyntheticMarketSortByFilter.TVL),
    always('syntheticsMarket.tableHeading.TVL'),
  ],
  [
    equals(SyntheticMarketSortByFilter.LTV),
    always('syntheticsMarket.tableHeading.LTV'),
  ],
  [
    equals(SyntheticMarketSortByFilter.Price),
    always('syntheticsMarket.filterSortOptionPrice'),
  ],
  [
    equals(SyntheticMarketSortByFilter.TransferFee),
    always('syntheticsMarket.filterSortOptionLiquidationFee'),
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
              <ArrowSVG width="100%" />
            </Box>
          }
          title={
            <Box display="flex" width="100%" py="XS" alignItems="center">
              <Typography variant="normal" whiteSpace="nowrap">
                {capitalize(
                  t(parseFarmSortByEnum(sortBy) as TTranslatedMessage)
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
                  GACategory.SyntheticsMarketFilters,
                  GAAction.Switch,
                  'Sort by = id'
                );
                setValue('sortBy', SyntheticMarketSortByFilter.Default);
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
                  GACategory.SyntheticsMarketFilters,
                  GAAction.Switch,
                  'Sort by = tvl'
                );
                setValue('sortBy', SyntheticMarketSortByFilter.TVL);
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
                  GACategory.SyntheticsMarketFilters,
                  GAAction.Switch,
                  'Sort by = ltv'
                );
                setValue('sortBy', SyntheticMarketSortByFilter.LTV);
              },
            },
            {
              value: 'price',
              displayOption: capitalize(
                t('syntheticsMarket.filterSortOptionPrice')
              ),
              displayTitle: (
                <Box display="flex" width="100%" py="XS" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    {t('syntheticsMarket.filterSortOptionPrice')}
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                logEvent(
                  GACategory.SyntheticsMarketFilters,
                  GAAction.Switch,
                  'Sort by = price'
                );
                setValue('sortBy', SyntheticMarketSortByFilter.Price);
              },
            },
            {
              value: 'fee',
              displayOption: capitalize(
                t('syntheticsMarket.filterSortOptionLiquidationFee')
              ),
              displayTitle: (
                <Box display="flex" width="100%" py="XS" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    {capitalize(
                      t('syntheticsMarket.filterSortOptionLiquidationFee')
                    )}
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                logEvent(
                  GACategory.SyntheticsMarketFilters,
                  GAAction.Switch,
                  'Sort by = fee'
                );
                setValue('sortBy', SyntheticMarketSortByFilter.TransferFee);
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default SortFilter;
