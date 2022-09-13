import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import ConnectWallet from '@/views/dapp/components/wallet/connect-wallet';

import InputMoney from '../input-money';
import { BorrowFormProps } from './borrow-form.types';
import BorrowFormButton from './borrow-form-button';
import BorrowFormLoanInfo from './borrow-form-loan-info';
import BorrowFormSelectLTV from './borrow-form-select-ltv';

const BorrowForm: FC<BorrowFormProps> = ({
  data,
  fields,
  account,
  control,
  loading,
  onSubmit,
  isBorrow,
  setValue,
  register,
  setError,
  clearErrors,
  isSubmitting,
  handleAddAllowance,
  formState: { errors },
}) => (
  <Box p="XL" order={2} gridArea="a" bg="foreground" borderRadius="L">
    {fields.map((input) =>
      loading ? (
        <Box mb="L" key={v4()}>
          <Typography variant="normal" width="10rem" fontSize="S" mt="M" mb="L">
            <Skeleton />
          </Typography>
          <Skeleton style={{ height: '2.3rem' }} />
        </Box>
      ) : (
        <InputMoney
          data={data}
          key={v4()}
          errors={errors}
          control={control}
          register={register}
          setValue={setValue}
          {...input}
        />
      )
    )}
    <BorrowFormSelectLTV
      data={data}
      control={control}
      setValue={setValue}
      isBorrow={!!isBorrow}
    />
    <BorrowFormLoanInfo control={control} data={data} isBorrow={!!isBorrow} />
    {account ? (
      <BorrowFormButton
        data={data}
        errors={errors}
        control={control}
        isBorrow={isBorrow}
        onSubmit={onSubmit}
        setError={setError}
        clearErrors={clearErrors}
        isSubmitting={isSubmitting}
        handleAddAllowance={handleAddAllowance}
      />
    ) : (
      <Box display="flex" justifyContent="center" mt="L">
        <ConnectWallet />
      </Box>
    )}
  </Box>
);

export default BorrowForm;
