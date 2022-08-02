import { FC } from 'react';

import { Switch } from '@/components';
import { Box, Dropdown, Input, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import { EarnFiltersProps } from '../../earn.types';
import { getFilterSwitchDefaultData } from '../earn.data';

const EarnFilters: FC<EarnFiltersProps> = ({
  setValue,
  register,
  isLive,
  isStaked,
  sortBy,
}) => {
  const SWITCH_DEFAULT_DATA = getFilterSwitchDefaultData(
    ['live', 'finished'],
    setValue,
    'isLive'
  );
  const SWITCH_ONOFF_DATA = getFilterSwitchDefaultData(
    ['off', 'on'],
    setValue,
    'isStaked'
  );

  return (
    <Box
      p="L"
      mt="M"
      borderRadius="L"
      bg="foreground"
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="wrap"
      >
        <Box display="flex" flexDirection="column">
          <Typography
            fontSize="S"
            mb="M"
            variant="normal"
            display="inline-block"
          >
            Staked only
          </Typography>
          <Switch
            defaultValue={!isStaked ? 'on' : 'off'}
            options={SWITCH_ONOFF_DATA}
            bg="background"
            bgSelected="accentAlternative"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          my={['M', 'M', 'M', 'unset']}
        >
          <Typography
            fontSize="S"
            mb="M"
            variant="normal"
            display="inline-block"
          >
            Status
          </Typography>
          <Switch
            defaultValue={isLive ? 'live' : 'finished'}
            options={SWITCH_DEFAULT_DATA}
            bg="background"
            bgSelected="accentAlternative"
          />
        </Box>
        <Box width={['48%', '48%', '48%', 'unset']}>
          <Typography
            as="label"
            fontSize="S"
            mb="M"
            variant="normal"
            display="inline-block"
          >
            Sort by:
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
              emptyMessage="Not found Tokens"
              suffix={
                <Box ml="L" display={['none', 'none', 'none', 'block']}>
                  <ArrowSVG width="0.6rem" height="0.6rem" />
                </Box>
              }
              title={
                <Box display="flex" width="100%" py="M" alignItems="center">
                  <Typography variant="normal" whiteSpace="nowrap">
                    {sortBy}
                  </Typography>
                </Box>
              }
              data={[
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
                    setValue('sortBy', 'TVL');
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
                    setValue('sortBy', 'APR');
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
                    setValue('sortBy', 'Allocation');
                  },
                },
              ]}
            />
          </Box>
        </Box>
        <Box width={['48%', '48%', '48%', 'unset']}>
          <Typography
            as="label"
            fontSize="S"
            mb="M"
            variant="normal"
            display="inline-block"
          >
            Search
          </Typography>
          <Input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            py="0.9rem"
            color="text"
            type="text"
            width="100%"
            bg="bottomBackground"
            borderRadius="M"
            border="1px solid"
            borderColor="background"
            {...register('search')}
            fontSize="S"
            placeholder="Search by name or symbol..."
            focus={{
              borderColor: 'accentAlternativeBackground',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EarnFilters;
