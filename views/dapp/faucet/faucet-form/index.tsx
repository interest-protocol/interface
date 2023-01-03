import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { AddressZero } from '@/sdk';

import { IFaucetForm } from '../faucet.types';
import InputBalance from '../input-balance';
import CurrencyIdentifier from './faucet-currency-identifier';
import { FaucetFormProps } from './faucet-form.types';
import FaucetSelectCurrency from './faucet-select-currency';
import ItemBalance from './item-balance';
import MintButton from './mint-button';

const FaucetForm: FC<FaucetFormProps> = ({
  tokens,
  isLoadingData,
  refetch,
}) => {
  const { register, getValues, setValue, control } = useForm<IFaucetForm>({
    defaultValues: {
      token: tokens?.[0]?.address ?? AddressZero,
      amount: 0,
    },
  });

  const onSelectCurrency = (token: string) => {
    setValue('token', token);
    setValue('amount', 0);
  };

  return (
    <>
      <Box
        py="XL"
        color="text"
        width="100%"
        display="grid"
        gridGap="1rem"
        height={['auto', 'auto', 'auto', '22rem']}
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        <Box
          py="L"
          display="flex"
          bg="foreground"
          px={['L', 'XL']}
          borderRadius="M"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <FaucetSelectCurrency
            tokens={tokens}
            label="Escolha o Token"
            defaultValue={tokens?.[0]?.address ?? AddressZero}
            onSelectCurrency={onSelectCurrency}
          />
          <InputBalance
            name="amount"
            register={register}
            label="O montante"
            setValue={setValue}
            currencyPrefix={
              isLoadingData ? (
                <Skeleton width="4rem" />
              ) : (
                <CurrencyIdentifier
                  chainId={-1}
                  tokens={tokens}
                  control={control}
                />
              )
            }
          />
          <Box display="flex" justifyContent="center">
            <MintButton
              control={control}
              getValues={getValues}
              refetch={refetch}
            />
          </Box>
        </Box>
        <Box
          py="L"
          display="flex"
          bg="foreground"
          px={['L', 'XL']}
          borderRadius="M"
          maxHeight="22rem"
          overflowY="hidden"
          flexDirection="column"
        >
          <Typography variant="normal" textTransform="uppercase" my="L">
            Balance
          </Typography>
          <Box
            display="grid"
            overflowY="auto"
            gridGap="0.25rem"
            alignItems="start"
          >
            {isLoadingData
              ? Array.from({ length: 5 }).map(() => (
                  <Box mb="L" key={v4()}>
                    <Skeleton />
                  </Box>
                ))
              : tokens.map(({ symbol, Icon }) => {
                  const SVG = Icon;
                  return (
                    <ItemBalance
                      SVG={SVG}
                      objectNumbers={3}
                      totalBalance={'0.00345'}
                      key={v4()}
                      symbol={symbol}
                    />
                  );
                })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FaucetForm;
