import { useTranslations } from 'next-intl';
import { always, cond, equals, T } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';

import { Box, Dropdown, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';
import { capitalize } from '@/utils';

import { FarmSortByFilter } from '../../earn.types';
import { SortFilterProps } from './earn-filters.types';

const parseFarmSortByEnum = cond([
  [equals(FarmSortByFilter.Default), always('select')],
  [equals(FarmSortByFilter.Allocation), always('allocation')],
  [equals(FarmSortByFilter.TVL), always('tvl')],
  [equals(FarmSortByFilter.APR), always('apr')],
  [T, always('select')],
]);

const SortFilter: FC<SortFilterProps> = ({ control, setValue }) => {
  const t = useTranslations();
  const sortBy = useWatch({ control, name: 'sortBy' });

  return (
    <Box width={['48%', '48%', '48%', 'unset']} my={['M', 'M', 'M', 'NONE']}>
      <Typography
        as="label"
        fontSize="S"
        mb="M"
        variant="normal"
        display="inline-block"
      >
        {capitalize(t('common.sort'))}:
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        width={['100%', '100%', '100%', '10rem']}
      >
        <Dropdown
          buttonMode
          mode="select"
          bg="accentAlternative"
          bgSelected="accentAlternativeBackground"
          emptyMessage={capitalize(t('common.notFound'))}
          suffix={
            <Box ml="L" width="0.6rem">
              <ArrowSVG width="100%" />
            </Box>
          }
          title={
            <Box display="flex" width="100%" py="M" alignItems="center">
              <Typography
                variant="normal"
                whiteSpace="nowrap"
                textTransform="capitalize"
              >
                {t(
                  ('common.' + parseFarmSortByEnum(sortBy)) as MessageKeys<
                    IntlMessages,
                    keyof IntlMessages
                  >
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
                setValue('sortBy', FarmSortByFilter.Default);
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
                setValue('sortBy', FarmSortByFilter.TVL);
              },
            },
            {
              value: 'apr',
              displayOption: 'APR',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    APR
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', FarmSortByFilter.APR);
              },
            },
            {
              value: 'Allocation',
              displayOption: 'Allocation',
              displayTitle: (
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    Allocation
                  </Typography>
                </Box>
              ),
              onSelect: () => {
                setValue('sortBy', FarmSortByFilter.Allocation);
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default SortFilter;
