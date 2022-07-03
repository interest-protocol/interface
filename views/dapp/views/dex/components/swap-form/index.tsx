import { FC, useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import { WalletGuardButton } from '@/views/dapp/components';

import { SwapFormProps } from '../../dex.types';
import InputBalance from '../input-balance';
import SwapSelectCurrency from '../swap-select-currency';

const SwapForm: FC<SwapFormProps> = ({
  tokens,
  setValue,
  register,
  control,
  getValues,
}) => {
  const [loading, setLoading] = useState(false);
  const originAddress = useWatch({ control, name: 'origin.address' });
  const targetAddress = useWatch({ control, name: 'target.address' });
  const originValue = useWatch({ control, name: 'origin.value' });
  const targetValue = useWatch({ control, name: 'target.value' });

  const onSelectCurrency = (name: 'origin' | 'target') => (address: string) =>
    setValue(`${name}.address`, address);

  const changeOrigin = () => {
    const oldTargetValue = targetValue;
    const oldTargetAddress = targetAddress;
    const oldOriginAddress = originAddress;

    setValue('origin.value', oldTargetValue);
    setValue('origin.address', oldTargetAddress);
    setValue('target.address', oldOriginAddress);
  };

  useEffect(() => {
    setValue('target.value', String(+originValue * (Math.random() * 2)));
  }, [originValue]);

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
              defaultValue={originAddress}
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
          onClick={changeOrigin}
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
        <WalletGuardButton>
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
        </WalletGuardButton>
      </Box>
    </Box>
  );
};
export default SwapForm;
