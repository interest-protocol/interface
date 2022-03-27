import { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
  FAUCET_TOKENS,
  TOKEN_SYMBOL,
  TOKENS_SVG_MAP,
} from '@/constants/erc-20.data';
import { Box, Dropdown, Input, Typography } from '@/elements';
import { ArrowSVG, SearchSVG } from '@/svg';

const FaucetSelectCurrency: FC = () => {
  const { register, watch } = useForm({
    defaultValues: { search: '' },
  });

  return (
    <Dropdown
      customTitle
      customItems
      title="Tokens"
      mode="select"
      search={watch('search')}
      defaultValue={TOKEN_SYMBOL.BTC}
      suffix={<ArrowSVG width="0.5rem" />}
      header={
        <Input
          p="M"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          {...register('search')}
          placeholder="Search"
          Prefix={
            <Box px="L" borderRight="1px solid" borderColor="bottomBackground">
              <SearchSVG width="0.7rem" />
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
              <SVG width="1rem" />
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
