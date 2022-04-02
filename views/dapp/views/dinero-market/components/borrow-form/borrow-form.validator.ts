import { object, string } from 'yup';

export const borrowFormValidation = object().shape({
  borrow: object().shape({
    collateral: string().min(0, 'Please insert a number'),
    loan: string().min(0, 'The minimum value is 0'),
  }),
  repay: object().shape({
    collateral: string().min(0, 'The minimum value is 0'),
    loan: string().min(0, 'The minimum value is 0'),
  }),
});
