import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';

import InputMoney from '../input-money';
import { BorrowFormProps } from './borrow-form.types';
import BorrowFormButton from './borrow-form-button';
import BorrowFormSelectLTV from './borrow-form-select-ltv';

const INFO = [
  'Expected DNR borrowed',
  'Expected Liquidation Price',
  'Position Health',
];

const BorrowForm: FC<BorrowFormProps> = ({
  data,
  fields,
  control,
  loading,
  loanData,
  onSubmit,
  isBorrow,
  setValue,
  register,
  setError,
  clearErrors,
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
    {isBorrow && (
      <BorrowFormSelectLTV data={data} control={control} setValue={setValue} />
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
    <BorrowFormButton
      data={data}
      errors={errors}
      control={control}
      isBorrow={isBorrow}
      setError={setError}
      onSubmit={onSubmit}
      clearErrors={clearErrors}
      handleAddAllowance={handleAddAllowance}
    />
  </Box>
);

export default BorrowForm;
