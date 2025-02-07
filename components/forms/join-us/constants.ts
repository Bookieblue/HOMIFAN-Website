import * as yup from 'yup';
import {
  FormField,
  sharedSchema,
  initialValues,
  sharedFormElements,
} from '../constants';

export const membershipValues = {
  ...initialValues,
  areaOfInterest: '',
  methodOfContact: '',
};

export const membershipSchema = sharedSchema.concat(
  yup.object().shape({
    areaOfInterest: yup.string().required('Area of interest is required'),
    methodOfContact: yup
      .string()
      .required('Preferred contact method is required'),
  })
);

const membershipSpecificElements: Array<FormField> = [
  {
    htmlFor: 'areaOfInterest',
    label: 'Areas of Interest',
    choices: [
      { label: 'Areas of Interest', value: '', disabled: true },
      { label: 'Volunteering', value: 'volunteering' },
      { label: 'Church Events', value: 'events' },
    ],
  },
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

export const membershipFormElement: Array<FormField> = [
  ...sharedFormElements,
  ...membershipSpecificElements,
];
