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
  pubType: 'printBook',
};

export const publicationSchema = sharedSchema.concat(
  yup.object().shape({
    message: yup.string(),
    pubType: yup.string().required(),
  })
);

export const publicationFormElement: Array<FormField> = [
  ...sharedFormElements,
  {
    htmlFor: 'pubType',
    label: 'Publication Type',
    choices: [
      { label: 'Printed Book', value: 'printBook' },
      { label: 'Electronic Book (ebook)', value: 'eBook' },
    ],
  },
];
