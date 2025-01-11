import * as yup from 'yup';
import { FormField, initialValues, sharedFormElements, sharedSchema } from '../constants';

export const prayerValues = {
  ...initialValues,
  contactMethod: '',
  prayerRequest: '',
};

export const prayerSchema = sharedSchema.concat(
  yup.object().shape({
    contactMethod: yup
      .string()
      .required('Preferred contact method is required'),
    prayerRequest: yup.string(),
  })
);

export const prayerFormElement: Array<FormField> = [
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
