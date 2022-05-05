import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { FAUCET_TOKENS, TOKENS_SVG_MAP } from '@/constants/erc-20';
import { Box, Dropdown, Input, Typography } from '@/elements';
import { ArrowSVG, SearchSVG } from '@/svg';

import { FaucetSelectCurrencyProps } from './faucet.types';

const FaucetSelectCurrency: FC<FaucetSelectCurrencyProps> = ({
  defaultValue,
  onSelectCurrency,
}) => {
  const { register, watch } = useForm({
    defaultValues: { search: '' },
  });

  return (
    <Dropdown
      relative
      customTitle
      customItems
      mode="select"
      title="Tokens"
      search={watch('search')}
      defaultValue={defaultValue}
      suffix={<ArrowSVG width="0.5rem" />}
      header={
        <Input
          p="M"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder="Search"
          {...register('search')}
          Prefix={
            <Box px="L" borderRight="1px solid" borderColor="bottomBackground">
              <SearchSVG width="0.7rem" height="0.7rem" />
            </Box>
          }
          shieldProps={{
            mb: 'XL',
            width: '15rem',
            bg: 'background',
            borderRadius: 'S',
          }}
        />
      }
      data={FAUCET_TOKENS.map(({ symbol }) => {
        const SVG = TOKENS_SVG_MAP[symbol];
        return {
          onSelect: () => onSelectCurrency(symbol),
          displayOption: (
            <Typography
              m="M"
              variant="normal"
              minWidth="15rem"
              hover={{ color: 'accent' }}
              active={{ color: 'accentActive' }}
            >
              {symbol}
            </Typography>
          ),
          displayTitle: (
            <>
              <SVG width="1rem" height="1rem" />
              <Typography
                mx="S"
                as="span"
                variant="normal"
                hover={{ color: 'accent' }}
                active={{ color: 'accentActive' }}
              >
                {symbol}
              </Typography>
            </>
          ),
          value: symbol,
        };
      })}
    />
  );
};

export default FaucetSelectCurrency;
