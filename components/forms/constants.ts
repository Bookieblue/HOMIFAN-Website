import * as yup from 'yup';

export type FormField = {
  label: string;
  placeholder?: string;
  htmlFor: string;
  type?: 'text' | 'email' | 'password';
  choices?: { label: string; value: string; disabled?: boolean }[];
};

export const initialValues = {
  email: '',
  country: '',
  lastName: '',
  cityAndState: '',
  firstName: '',
  phoneNumber: '',
};

export const sharedSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+234\d{10}|\d{11})$/, 'Phone number must be either 11 digits or start with +234 followed by 10 digits'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  country: yup.string().required('Country is required'),
  cityAndState: yup.string().required('City & State is required'),
});

export const sharedFormElements: Array<FormField> = [
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
    htmlFor: 'cityAndState',
    label: 'City & State',
    placeholder: 'eg. Akure, Ondo state',
  },
];
