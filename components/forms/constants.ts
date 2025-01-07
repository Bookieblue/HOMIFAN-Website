import * as yup from 'yup';

type FormField = {
  label: string;
  placeholder?: string;
  htmlFor: keyof typeof initialValues;
  type?: 'text' | 'email' | 'password';
  choices?: { label: string; value: string; disabled?: boolean }[];
};

export const initialValues = {
  email: '',
  country: '',
  lastName: '',
  cityState: '',
  firstName: '',
  phoneNumber: '',
  interestArea: '',
  contactMethod: '',
  prayerRequest: '',
};

export const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+234\d{10}$/, 'Must start with +234'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  country: yup.string().required('Country is required'),
  cityState: yup.string().required('City & State are required'),
  interestArea: yup.string().required('Area of interest is required'),
  contactMethod: yup.string().required('Preferred contact method is required'),
  prayerRequest: yup.string(),
});

export const membershipFormElement: Array<FormField> = [
  {
    type: 'text',
    label: 'First Name',
    htmlFor: 'firstName',
    placeholder: 'eg. Ademola',
  },
  {
    type: 'text',
    label: 'Last Name',
    htmlFor: 'lastName',
    placeholder: 'eg. Johnson',
  },
  {
    type: 'text',
    label: 'Phone Number',
    htmlFor: 'phoneNumber',
    placeholder: 'eg. +234....',
  },
  {
    type: 'email',
    htmlFor: 'email',
    label: 'Email Address',
    placeholder: 'eg. yourname@gmail.com',
  },
  {
    type: 'text',
    label: 'Country',
    htmlFor: 'country',
    placeholder: 'eg. Nigeria',
  },
  {
    type: 'text',
    htmlFor: 'cityState',
    label: 'City & State',
    placeholder: 'eg. Akure, Ondo state',
  },
  {
    htmlFor: 'interestArea',
    label: 'Areas of Interest',
    choices: [
      { label: 'Areas of Interest', value: '', disabled: true },
      { label: 'Volunteering', value: 'volunteering' },
      { label: 'Church Events', value: 'events' },
    ],
  },
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
