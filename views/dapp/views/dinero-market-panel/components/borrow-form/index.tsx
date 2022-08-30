import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { WalletGuardButton } from '@/views/dapp/components';

import InputMoney from '../input-money';
import { BorrowFormProps } from './borrow-form.types';
import BorrowFormButton from './borrow-form-button';
import BorrowFormLoanInfo from './borrow-form-loan-info';
import BorrowFormSelectLTV from './borrow-form-select-ltv';

const BorrowForm: FC<BorrowFormProps> = ({
  data,
  fields,
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
  <Box
    p="XL"
    order={2}
    gridArea="a"
    height="100%"
    bg="foreground"
    borderRadius="L"
  >
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
          key={v4()}
          data={data}
          errors={errors}
          control={control}
          isBorrow={isBorrow}
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
    <WalletGuardButton>
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
    </WalletGuardButton>
  </Box>
);

export default BorrowForm;
