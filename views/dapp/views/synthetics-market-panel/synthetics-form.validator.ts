import { object, string } from 'yup';

export const syntheticsFormValidation = object().shape({
  mint: object().shape({
    collateral: string().min(0, 'Please insert a number'),
    synt: string().min(0, 'The minimum value is 0'),
  }),
  burn: object().shape({
    collateral: string().min(0, 'The minimum value is 0'),
    synt: string().min(0, 'The minimum value is 0'),
  }),
});
