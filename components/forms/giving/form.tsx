'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormField,
  sharedSchema,
  initialValues,
  sharedFormElements,
} from '../constants';

const givingSchema = sharedSchema;
const givingFormElement: Array<FormField> = [...sharedFormElements];

const GivingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(givingSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Add any form submission logic here, e.g., API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 pb-1 gap-x-3 gap-y-5">
        {givingFormElement.map(field => (
          <div key={field.htmlFor} className="grid gap-1.5">
            <label className="text-black-50/80" htmlFor={field.htmlFor}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.htmlFor as keyof typeof initialValues)}
              className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
            />
            {errors[field.htmlFor as keyof typeof initialValues] && (
              <p className="text-red-500 text-sm">
                {errors[field.htmlFor as keyof typeof initialValues]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full mt-5 flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-semibold p-3 rounded-md transition"
      >
        Make Payment Now
        <ArrowRight absoluteStrokeWidth strokeWidth={3} className="size-4" />
      </button>
    </form>
  );
};

export default GivingForm;
