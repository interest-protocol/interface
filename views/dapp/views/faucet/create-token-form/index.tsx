import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG, TimesSVG } from '@/svg';

import { CreateTokenFormProps } from '../faucet.types';
import CreateTokenField from './create-token-field';
import { TCreateTokenForm } from './create-token-form.types';
import CreateTokenSupplyField from './create-token-supply-field';

const CreateTokenForm: FC<CreateTokenFormProps> = ({
  handleClose,
  addLocalToken,
}) => {
  const [loading, setLoading] = useState(false);
  const { setValue, register, getValues } = useForm<TCreateTokenForm>({
    defaultValues: {
      name: '',
      symbol: '',
      amount: '',
    },
  });

  const handleCreateToken = () => {
    setLoading(true);
    // TODO: replace to token address
    const address = v4();
    addLocalToken({
      address,
      name: getValues('name'),
      symbol: getValues('name'),
    });
    setLoading(false);
  };

  return (
    <Box>
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
        <Button
          mt="L"
          width="100%"
          variant="primary"
          disabled={loading}
          onClick={handleCreateToken}
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
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
