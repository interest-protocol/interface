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
  isBorrow,
  account,
  refetch,
  isGettingData,
  form,
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
      isGettingData ? (
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
          errors={form.formState.errors}
          control={form.control}
          isBorrow={isBorrow}
          register={form.register}
          setValue={form.setValue}
          {...input}
        />
      )
    )}
    <BorrowFormSelectLTV
      data={data}
      control={form.control}
      setValue={form.setValue}
      isBorrow={!!isBorrow}
    />
    <BorrowFormLoanInfo
      control={form.control}
      data={data}
      isBorrow={!!isBorrow}
    />
    <WalletGuardButton>
      <BorrowFormButton
        isBorrow={isBorrow}
        data={data}
        form={form}
        account={account}
        refetch={refetch}
      />
    </WalletGuardButton>
  </Box>
);

export default BorrowForm;
