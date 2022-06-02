import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { LoadingSVG } from '@/svg';

import { FaucetFormProps, IFaucetForm } from '../faucet.types';
import FaucetSelectCurrency from '../faucet-select-currency';
import InputBalance from '../input-balance';

const FaucetForm: FC<FaucetFormProps> = ({ tokens, local }) => {
  const [loading, setLoading] = useState(false);

  const { register, getValues, setValue } = useForm<IFaucetForm>({
    defaultValues: {
      currency: tokens?.[0]?.symbol ?? TOKEN_SYMBOL.Unknown,
      value: 0,
    },
  });

  const onSelectCurrency = (currency: string) => {
    setValue('currency', currency);
    setValue('value', 0);
  };

  const onMint = useCallback(async () => {
    setLoading(true);
    console.log('>> Mint');
    const timeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(timeout);
    }, Math.random() * 3000);
  }, []);

  return (
    <Box color="text" width="100%" display="grid" gridGap="1rem">
      <Box
        py="L"
        display="flex"
        bg="foreground"
        borderRadius="M"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <InputBalance
          name="value"
          register={register}
          setValue={setValue}
          getValues={getValues}
          suffix={
            <FaucetSelectCurrency
              local={!!local}
              tokens={tokens}
              onSelectCurrency={onSelectCurrency}
              defaultValue={getValues('currency')}
            />
          }
        />

        <InputBalance
          disabled
          name="value"
          register={register}
          setValue={setValue}
          getValues={getValues}
          suffix={
            <FaucetSelectCurrency
              local={!!local}
              tokens={tokens}
              onSelectCurrency={onSelectCurrency}
              defaultValue={getValues('currency')}
            />
          }
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
    </Box>
  );
};
export default FaucetForm;
