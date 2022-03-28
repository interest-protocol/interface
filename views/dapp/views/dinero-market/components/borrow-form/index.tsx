import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';

import InputMoney from '../input-money';
import { BorrowFormProps } from './borrow-form.types';
import BorrowFormButton from './borrow-form-button';

const INFO = ['Dinero Amount', 'Expected Liquidation Price', 'Position Health'];

const BorrowForm: FC<BorrowFormProps> = ({
  watch,
  fields,
  onSubmit,
  isBorrow,
  setValue,
  register,
  getValues,
  buttonText,
  handleSubmit,
  loanData,
}) => (
  <Box
    p="XL"
    as="form"
    order={2}
    gridArea="a"
    bg="foreground"
    borderRadius="L"
    onSubmit={handleSubmit(onSubmit)}
  >
    {fields.map((input) => (
      <InputMoney
        key={v4()}
        register={register}
        setValue={setValue}
        {...input}
      />
    ))}

    <Box mt="XXL">
      {INFO.map((x, i) => (
        <Box key={v4()} display="flex" justifyContent="space-between" p="M">
          <Typography variant="normal">{x}</Typography>
          <Typography variant="normal">{loanData[i]}</Typography>
        </Box>
      ))}
    </Box>
    {isBorrow && (
      <Box mt="XL">
        <Typography variant="normal" fontSize="S">
          Liquidation price
        </Typography>
        <Box display="flex" justifyContent="space-between" my="L">
          {[0, 25, 50, 75, 100].map((item) => (
            <Button
              key={v4()}
              width="3rem"
              fontSize="S"
              height="3rem"
              type="button"
              display="flex"
              borderRadius="M"
              variant="secondary"
              alignItems="center"
              justifyContent="center"
              hover={{ bg: 'accent' }}
              active={{ bg: 'accentActive' }}
              bg={
                (getValues('borrow.loan') &&
                  getValues('borrow.loan')! / getValues('borrow.collateral') >=
                    item) ||
                (!getValues('borrow.collateral') &&
                  !getValues('borrow.collateral') &&
                  item === 0)
                  ? 'background'
                  : 'bottomBackground'
              }
            >
              {item}%
            </Button>
          ))}
        </Box>
      </Box>
    )}
    <BorrowFormButton
      watch={watch}
      isBorrow={isBorrow}
      buttonText={buttonText}
    />
  </Box>
);

export default BorrowForm;
