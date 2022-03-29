import { number, object } from 'yup';

export const borrowFormValidation = object().shape({
  borrow: object().shape({
    collateral: number().min(0, 'Please insert a number'),
    loan: number().min(0).max(32),
  }),
  repay: object().shape({
    collateral: number(),
    loan: number().min(0),
  }),
});
