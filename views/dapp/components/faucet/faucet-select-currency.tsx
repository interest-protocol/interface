import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Dropdown, Input, Typography } from '@/elements';
import { ArrowSVG, BinanceSVG, BitcoinSVG, SearchSVG } from '@/svg';

const FaucetSelectCurrency: FC = () => {
  const { register, watch } = useForm({
    defaultValues: { search: '' },
  });

  return (
    <Dropdown
      customTitle
      customItems
      title="BNB"
      mode="select"
      search={watch('search')}
      defaultValue="BNB"
      suffix={<ArrowSVG width="0.5rem" />}
      header={
        <Input
          p="M"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          {...register('search')}
          placeholder="Pesquisar"
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
      data={[
        {
          displayOption: (
            <Typography
              m="M"
              variant="normal"
              minWidth="15rem"
              hover={{ color: 'accent' }}
              active={{ color: 'accentActive' }}
            >
              BNB
            </Typography>
          ),
          displayTitle: (
            <>
              <BinanceSVG width="1rem" />
              <Typography
                mx="S"
                as="span"
                variant="normal"
                hover={{ color: 'accent' }}
                active={{ color: 'accentActive' }}
              >
                BNB
              </Typography>
            </>
          ),
          value: 'BNB',
        },
        {
          displayOption: (
            <Typography
              m="M"
              variant="normal"
              minWidth="15rem"
              hover={{ color: 'accent' }}
              active={{ color: 'accentActive' }}
            >
              BTC
            </Typography>
          ),
          displayTitle: (
            <>
              <BitcoinSVG width="1rem" />
              <Typography
                mx="S"
                as="span"
                variant="normal"
                hover={{ color: 'accent' }}
                active={{ color: 'accentActive' }}
              >
                BTC
              </Typography>
            </>
          ),
          value: 'BTC',
        },
      ]}
    />
  );
};

export default FaucetSelectCurrency;
