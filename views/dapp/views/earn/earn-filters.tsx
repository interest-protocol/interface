import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Switch } from '@/components';
import { Box, Dropdown, Input, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import { getFilterSwitchDefaultData } from './components/earn.data';
import { EarnPageProps } from './earn.types';

const EarnFilters: FC<EarnPageProps> = ({ type }) => {
  const { register } = useForm({ defaultValues: { search: '' } });
  const [history, setHistory] = useState(true);
  const [onOff, setOnOff] = useState(!false);
  const SWITCH_DEFAULT_DATA = getFilterSwitchDefaultData(setHistory, [
    'live',
    'finished',
  ]);
  const SWITCH_ONOFF_DATA = getFilterSwitchDefaultData(setOnOff, ['off', 'on']);

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
            defaultValue={!onOff ? 'on' : 'off'}
            options={SWITCH_ONOFF_DATA}
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
            defaultValue={history ? 'live' : 'finished'}
            options={SWITCH_DEFAULT_DATA}
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
              defaultValue={'token'}
              emptyMessage="Not found Tokens"
              suffix={
                <Box ml="L" display={['none', 'none', 'none', 'block']}>
                  <ArrowSVG width="0.6rem" height="0.6rem" />
                </Box>
              }
              title={'Select'}
              data={[
                {
                  value: 'token',
                  displayOption: 'Token',
                  displayTitle: (
                    <Box display="flex" width="100%" py="M" alignItems="center">
                      <Typography variant="normal" whiteSpace="nowrap">
                        Token
                      </Typography>
                    </Box>
                  ),
                  onSelect: () => console.log(1),
                },
                {
                  value: 'type',
                  displayOption: type == 'farms' ? 'TVL' : 'Liquidity',
                  displayTitle: (
                    <Box display="flex" width="100%" py="M" alignItems="center">
                      <Typography variant="normal" whiteSpace="nowrap">
                        {type == 'farms' ? 'TVL' : 'Liquidity'}
                      </Typography>
                    </Box>
                  ),
                  onSelect: () => console.log(1),
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
                  onSelect: () => console.log(1),
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
                  onSelect: () => console.log(1),
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
            py="0.9rem"
            color="text"
            width="100%"
            bg="bottomBackground"
            borderRadius="M"
            border="1px solid"
            borderColor="background"
            {...register('search')}
            fontSize="S"
            placeholder="Search by name or symbol..."
            focus={{
              borderColor: 'accent',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EarnFilters;
