import * as yup from 'yup';
import {
  FormField,
  sharedSchema,
  initialValues,
  sharedFormElements,
} from '../constants';

export const eventValues = {
  ...initialValues,
  methodOfContact: 'whatsApp',
};

export const eventSchema = sharedSchema.concat(
  yup.object().shape({
    methodOfContact: yup.string(),
  })
);

export const eventFormElement: Array<FormField> = [
  ...sharedFormElements,
  {
    htmlFor: 'methodOfContact',
    label: 'Preferred method of contact',
    choices: [
      { label: 'WhatsApp', value: 'whatsApp' },
      { label: 'Email', value: 'email' },
      { label: 'Phone Call', value: 'phone' },
    ],
  },
];
