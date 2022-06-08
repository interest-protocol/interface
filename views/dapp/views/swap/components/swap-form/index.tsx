import { FC, useCallback, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';

import { SwapFormProps } from '../../swap.types';
import InputBalance from '../input-balance';
import SwapSelectCurrency from '../swap-select-currency';

const SwapForm: FC<SwapFormProps> = ({
  tokens,
  setValue,
  getValues,
  register,
}) => {
  const [loading, setLoading] = useState(false);

  const onSelectCurrency = (name: 'origin' | 'target') => (address: string) =>
    setValue(`${name}.address`, address);

  const onMint = useCallback(async () => {
    setLoading(true);
    console.log('>> Mint');
    const timeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(timeout);
    }, Math.random() * 3000);
  }, []);

  return (
    <Box color="text" width="100%" display="grid" gridGap="1rem" pb="L">
      <Box
        py="L"
        display="flex"
        borderRadius="M"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <InputBalance
          name="origin.value"
          register={register}
          setValue={setValue}
          getValues={getValues}
          currencySelector={
            <SwapSelectCurrency
              tokens={tokens}
              defaultValue={getValues('origin.address')}
              onSelectCurrency={onSelectCurrency('origin')}
            />
          }
        />
        <Box
          mx="auto"
          my="-1.5rem"
          width="3rem"
          height="3rem"
          display="flex"
          bg="background"
          cursor="pointer"
          borderRadius="50%"
          border="1px solid"
          position="relative"
          alignItems="center"
          borderColor="accent"
          justifyContent="center"
          hover={{
            boxShadow: '0 0 0.5rem #0055FF',
          }}
        >
          ⥯
        </Box>
        <InputBalance
          disabled
          name="target.value"
          register={register}
          setValue={setValue}
          getValues={getValues}
          currencySelector={
            <SwapSelectCurrency
              tokens={tokens}
              defaultValue={getValues('target.address')}
              onSelectCurrency={onSelectCurrency('target')}
            />
          }
        />
        <Button
          mt="L"
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
                Swapping...
              </Typography>
            </Box>
          ) : (
            'Swap'
          )}
        </Button>
      </Box>
    </Box>
  );
};
export default SwapForm;
