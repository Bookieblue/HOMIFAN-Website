import * as yup from 'yup';
import {
  FormField,
  initialValues,
  sharedFormElements,
  sharedSchema,
} from '../constants';


export const icons = [
  'fab fa-facebook-f',
  'fab fa-instagram',
  'fab fa-twitter',
  'fab fa-youtube',
  'fab fa-whatsapp',
];

export const contactValues = {
  ...initialValues,
  message: '',
  contactMethod: '',
};

export const contactSchema = sharedSchema.concat(
  yup.object().shape({
    message: yup.string(),
    contactMethod: yup
      .string()
      .required('Preferred contact method is required'),
  })
);

export const contactFormElement: Array<FormField> = [
  ...sharedFormElements,
  {
    htmlFor: 'contactMethod',
    label: 'Preferred method of contact',
    choices: [
      { label: 'Preferred Contact Method', value: '', disabled: true },
      { label: 'WhatsApp', value: 'whatsApp' },
      { label: 'Email', value: 'email' },
      { label: 'Phone Call', value: 'phone' },
    ],
  },
];
