import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import InputMoney from '../input-money';
import { BorrowFormProps } from './borrow-form.types';
import BorrowFormButton from './borrow-form-button';
import BorrowFormLiquidationFee from './borrow-form-liquidation';

const INFO = ['Dinero Amount', 'Expected Liquidation Price', 'Position Health'];

const BorrowForm: FC<BorrowFormProps> = ({
  fields,
  control,
  loading,
  loanData,
  onSubmit,
  isBorrow,
  setValue,
  register,
  ltvRatio,
  setError,
  clearErrors,
  currencyDiff,
  currencyAmount,
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
          key={v4()}
          control={control}
          register={register}
          setValue={setValue}
          currencyDiff={currencyDiff}
          errors={errors}
          {...input}
        />
      )
    )}
    <Box mt="XXL">
      {INFO.map((x, i) => (
        <Box key={v4()} display="flex" justifyContent="space-between" p="M">
          <Typography variant="normal" as="span">
            {x}
          </Typography>
          <Typography variant="normal" as="span">
            {loanData[i]}
          </Typography>
        </Box>
      ))}
    </Box>
    {isBorrow && (
      <BorrowFormLiquidationFee
        setValue={setValue}
        control={control}
        ltvRatio={ltvRatio}
      />
    )}
    <BorrowFormButton
      errors={errors}
      control={control}
      isBorrow={isBorrow}
      ltvRatio={ltvRatio}
      setError={setError}
      onSubmit={onSubmit}
      clearErrors={clearErrors}
      currencyDiff={currencyDiff!}
      currencyAmount={currencyAmount}
    />
  </Box>
);

export default BorrowForm;
