import * as yup from 'yup';
import { FormField, sharedSchema, sharedFormElements } from '../constants';

export const givingSchema = sharedSchema.concat(
  yup.object().shape({
    donationType: yup.string().required("donation type is required"),
    amount: yup
      .number()
      .typeError('Amount must be a number') // Ensures value is a number
      .required('Amount is required') // Ensures the field is filled
      .positive('Amount must be greater than zero') // Prevents negative or zero values
      .integer('Amount must be a whole number'), // Optional: disallow decimals
  })
);

export const givingFormElement: Array<FormField> = [
  ...sharedFormElements,
  {
    type: 'text',
    label: 'Purpose',
    htmlFor: 'donationType',
    placeholder: 'Offering',
  },
  {
    type: 'text',
    label: 'Amount',
    htmlFor: 'amount',
    placeholder: '10000',
  },

];
