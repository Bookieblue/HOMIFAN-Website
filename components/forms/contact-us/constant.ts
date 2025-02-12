import * as yup from 'yup';
import {
  FormField,
  initialValues,
  sharedFormElements,
  sharedSchema,
} from '../constants';

export const contactValues = {
  ...initialValues,
  message: '',
  methodOfContact: '',
};

export const contactSchema = sharedSchema.concat(
  yup.object().shape({
    message: yup.string().required('Message is required'),
    methodOfContact: yup
      .string()
      .required('Preferred contact method is required'),
  })
);

export const contactFormElement: Array<FormField> = [
  ...sharedFormElements,
  {
    htmlFor: 'methodOfContact',
    label: 'Preferred method of contact',
    choices: [
      { label: 'Preferred Contact Method', value: '', disabled: true },
      { label: 'WhatsApp', value: 'whatsApp' },
      { label: 'Email', value: 'email' },
      { label: 'Phone Call', value: 'phone' },
    ],
  },
];
