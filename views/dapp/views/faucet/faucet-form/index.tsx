import { ethers } from 'ethers';
import { pathOr, prop } from 'ramda';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import { mintMAILFaucetToken } from '@/api';
import {
  DEFAULT_ERC_20_DECIMALS,
  ERC_20_DATA,
  TOKENS_SVG_MAP,
} from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner, useGetUserBalances } from '@/hooks';
import { IntMath } from '@/sdk';
import { TOKEN_SYMBOL } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import { LoadingSVG } from '@/svg';
import {
  formatMoney,
  isSameAddress,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import { FaucetFormProps, IFaucetForm } from '../faucet.types';
import CurrencyIdentifier from '../faucet-currency-identidier';
import FaucetSelectCurrency from '../faucet-select-currency';
import InputBalance from '../input-balance';
import { processGetUserBalances } from '../utilts';

const FaucetForm: FC<FaucetFormProps> = ({ tokens, addLocalToken }) => {
  const [loading, setLoading] = useState(false);
  const { chainId, account, signer } = useGetSigner();
  const { error, data } = useGetUserBalances(tokens.map(prop('address')));
  const dispatch = useDispatch();

  const { register, getValues, setValue, control } = useForm<IFaucetForm>({
    defaultValues: {
      token: tokens?.[0]?.address ?? ethers.constants.AddressZero,
      amount: 0,
    },
  });

  const onSelectCurrency = (token: string) => {
    setValue('token', token);
    setValue('amount', 0);
  };

  const processedData = useMemo(
    () => processGetUserBalances(tokens, data),
    [tokens, data]
  );

  const handleOnMint = useCallback(async () => {
    try {
      setLoading(true);

      const amount = getValues('amount');
      const token = getValues('token');

      if (!amount || isSameAddress(token, ethers.constants.AddressZero)) return;

      const { validSigner, validId } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const decimals = pathOr(
        DEFAULT_ERC_20_DECIMALS,
        [validId, ethers.utils.getAddress(token), 'decimals'],
        ERC_20_DATA
      );

      const tx = await mintMAILFaucetToken(
        validSigner,
        token,
        account,
        IntMath.toBigNumber(amount, decimals)
      );

      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Something went wrong', error);
    } finally {
      setLoading(false);
      dispatch(coreActions.updateNativeBalance());
    }
  }, [chainId, signer, account]);

  const onMint = () =>
    showToast(handleOnMint(), {
      loading: 'Minting...',
      success: 'Success!',
      error: prop('message'),
    });

  if (error) return <div>error</div>;

  if (!data) return <div>loading</div>;

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
          addLocalToken={addLocalToken}
          tokens={tokens}
          label="Choose Token"
          onSelectCurrency={onSelectCurrency}
          defaultValue={getValues('token')}
        />
        <InputBalance
          name="amount"
          register={register}
          label="Type Amount"
          setValue={setValue}
          currencyPrefix={
            <CurrencyIdentifier control={control} chainId={chainId || 0} />
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
      <Box py="L" my="XL" bg="foreground" px={['L', 'XL']} borderRadius="M">
        <Typography variant="normal" textTransform="uppercase" mt="L">
          Your balance:
        </Typography>
        {processedData.map((x) => {
          const SVG =
            TOKENS_SVG_MAP[x.symbol] ?? TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

          const decimals = pathOr(
            DEFAULT_ERC_20_DECIMALS,
            [chainId || 0, ethers.utils.getAddress(x.address), 'decimals'],
            ERC_20_DATA
          );

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
                  {formatMoney(IntMath.toNumber(x.balance, decimals))}
                </Typography>
              </Box>
              <Typography variant="normal" color="textSecondary">
                {x.symbol}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default FaucetForm;
