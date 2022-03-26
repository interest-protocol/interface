import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';

import { taxes } from '../../borrow.data';
import InputMoney from '../input-money';
import { BorrowFormProps } from './borrow-form.types';

const BorrowForm: FC<BorrowFormProps> = ({
  fields,
  onSubmit,
  isBorrow,
  setValue,
  register,
  getValues,
  buttonText,
  handleSubmit,
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
      {taxes.map(({ name, value, percentual }) => (
        <Box key={v4()} display="flex" justifyContent="space-between" p="M">
          <Typography variant="normal">{name}</Typography>
          <Typography variant="normal">
            {value}
            {percentual && '%'}
          </Typography>
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
    <Box display="flex" justifyContent="center" mt="XXL">
      {(isBorrow &&
        !getValues('borrow.loan') &&
        !getValues('borrow.collateral')) ||
      (!isBorrow &&
        !getValues('repay.loan') &&
        !getValues('repay.collateral')) ? (
        <Box
          py="L"
          px="XL"
          fontSize="S"
          bg="disabled"
          borderRadius="M"
          cursor="not-allowed"
        >
          No Request
        </Box>
      ) : (
        <Button variant="primary" hover={{ bg: 'accentActive' }}>
          {buttonText}
        </Button>
      )}
    </Box>
  </Box>
);

export default BorrowForm;
