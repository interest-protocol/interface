import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { LoadingSVG } from '@/svg';
import { formatMoney } from '@/utils';

import { FaucetFormProps, IFaucetForm } from '../faucet.types';
import CurrencyIdentifier from '../faucet-currency-identidier';
import FaucetSelectCurrency from '../faucet-select-currency';
import InputBalance from '../input-balance';

const FaucetForm: FC<FaucetFormProps> = ({ tokens, local }) => {
  const [loading, setLoading] = useState(false);

  const { register, getValues, setValue, control } = useForm<IFaucetForm>({
    defaultValues: {
      currency: tokens?.[0]?.symbol ?? TOKEN_SYMBOL.Unknown,
      value: 0,
    },
  });

  const onSelectCurrency = (currency: string) => {
    setValue('currency', currency);
    setValue('value', 0);
  };

  const data = tokens.map(({ symbol }) => ({
    currency: { symbol },
    balance: 97842,
  }));

  const onMint = useCallback(async () => {
    setLoading(true);
    console.log('>> Mint');
    const timeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(timeout);
    }, Math.random() * 3000);
  }, []);

  return (
    <Box
      color="text"
      width="100%"
      display="grid"
      gridGap="1rem"
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
    >
      <Box
        py="L"
        my="XL"
        display="flex"
        bg="foreground"
        px={['L', 'XL']}
        borderRadius="M"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <FaucetSelectCurrency
          local={!!local}
          tokens={tokens}
          label="Choose Token"
          onSelectCurrency={onSelectCurrency}
          defaultValue={getValues('currency')}
        />
        <InputBalance
          name="value"
          register={register}
          label="Type Amount"
          setValue={setValue}
          getValues={getValues}
          currencyPrefix={<CurrencyIdentifier control={control} />}
        />

        <Box display="flex">
          <Button
            width="100%"
            onClick={onMint}
            variant="primary"
            disabled={loading}
            hover={{ bg: 'accentAlternativeActive' }}
            bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {loading ? (
              <Box as="span" display="flex" justifyContent="center">
                <LoadingSVG width="1rem" height="1rem" />
                <Typography as="span" variant="normal" ml="M" fontSize="S">
                  Minting...
                </Typography>
              </Box>
            ) : (
              'Mint'
            )}
          </Button>
        </Box>
      </Box>
      <Box py="L" my="XL" bg="foreground" px={['L', 'XL']} borderRadius="M">
        <Typography variant="normal" textTransform="uppercase" mt="L">
          Your balance:
        </Typography>
        {(local
          ? data.filter(
              ({ currency }) => currency.symbol === getValues('currency')
            )
          : data
        ).map((x) => {
          const SVG = TOKENS_SVG_MAP[x.currency.symbol];

          return (
            <Box
              key={v4()}
              display="flex"
              justifyContent="space-between"
              my="L"
            >
              <Box display="flex">
                <SVG width="1rem" height="1rem" />
                <Typography ml="M" variant="normal">
                  {formatMoney(x.balance)}
                </Typography>
              </Box>
              <Typography variant="normal" color="textSecondary">
                {x.currency.symbol}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default FaucetForm;
