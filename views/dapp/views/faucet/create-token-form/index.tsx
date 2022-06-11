import { ethers } from 'ethers';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createToken } from '@/api';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { coreActions } from '@/state/core/core.actions';
import { LoadingSVG, TimesSVG } from '@/svg';
import {
  extractCreateTokenEvent,
  isValidAccount,
  safeGetAddress,
} from '@/utils';
import {
  safeToBigNumber,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import ConnectWallet from '@/views/dapp/components/wallet/connect-wallet';

import { CreateTokenFormProps } from '../faucet.types';
import CreateTokenField from './create-token-field';
import { TCreateTokenForm } from './create-token-form.types';
import CreateTokenSupplyField from './create-token-supply-field';

const CreateTokenForm: FC<CreateTokenFormProps> = ({
  handleClose,
  addLocalToken,
}) => {
  const [loading, setLoading] = useState(false);
  const { chainId, signer, account } = useGetSigner();
  const { setValue, register, getValues } = useForm<TCreateTokenForm>({
    defaultValues: {
      name: '',
      symbol: '',
      amount: '',
    },
  });

  const dispatch = useDispatch();

  const handleCreateToken = async () => {
    try {
      setLoading(true);
      const [name, symbol, amount] = [
        getValues('name'),
        getValues('symbol'),
        getValues('amount'),
      ];

      if (!name || !symbol || !amount || amount === '0') return;

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const tx = await createToken(
        validId,
        validSigner,
        name,
        symbol,
        safeToBigNumber(amount)
      );

      await showTXSuccessToast(tx, validId);

      const receipt = await tx.wait();

      const { token } = extractCreateTokenEvent(receipt);

      if (isValidAccount(token))
        addLocalToken({
          symbol,
          name,
          address: safeGetAddress(token),
        });
    } catch (error) {
      throwError('Something went wrong', error);
    } finally {
      setLoading(false);
      dispatch(coreActions.updateNativeBalance());
    }
  };

  const safeCreateToken = () =>
    showToast(handleCreateToken(), {
      loading: 'Creating token...',
      success: 'Success!',
      error: prop('message'),
    });

  return (
    <Box width={['90vw', '70vw', '50vw', '30rem']}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          px="L"
          variant="primary"
          onClick={handleClose}
          hover={{
            bg: 'accentActive',
          }}
        >
          <TimesSVG width="1rem" height="1rem" />
        </Button>
      </Box>
      <Box bg="foreground" my="M" borderRadius="L" p="XL" color="text">
        <Typography
          mt="S"
          mb="XL"
          fontSize="L"
          variant="normal"
          textTransform="uppercase"
        >
          Create new token
        </Typography>
        <Box
          display="grid"
          gridColumnGap="1rem"
          gridTemplateColumns={['1fr', '1f', '1fr', '1fr 1fr']}
        >
          <CreateTokenField label="Name" name="name" register={register} />
          <CreateTokenField label="Symbol" name="symbol" register={register} />
        </Box>
        <CreateTokenSupplyField
          label="Amount"
          register={register}
          setValue={setValue}
        />
        {account ? (
          <Button
            mt="L"
            width="100%"
            variant="primary"
            disabled={loading}
            onClick={safeCreateToken}
            hover={{ bg: 'accentAlternativeActive' }}
            bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {loading ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <LoadingSVG width="1rem" />
                <Typography fontSize="S" variant="normal" ml="M">
                  Creating Token
                </Typography>
              </Box>
            ) : (
              'Create Token'
            )}
          </Button>
        ) : (
          <Box display="flex" justifyContent="center">
            <ConnectWallet />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
