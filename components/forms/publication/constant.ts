import * as yup from 'yup';
import {
  FormField,
  sharedSchema,
  initialValues,
  sharedFormElements,
} from '../constants';

export const publicationValues = {
  ...initialValues,
  message: '',
  contactMethod: 'whatsApp',
};

export const publicationSchema = sharedSchema.concat(
  yup.object().shape({
    message: yup.string(),
    contactMethod: yup.string(),
  })
);

export const publicationFormElement: Array<FormField> = [
  ...sharedFormElements,
  {
    htmlFor: 'contactMethod',
    label: 'Preferred method of contact',
    choices: [
      { label: 'WhatsApp', value: 'whatsApp' },
      { label: 'Email', value: 'email' },
      { label: 'Phone Call', value: 'phone' },
    ],
  },
];
