'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  contactSchema,
  contactFormElement,
  contactValues as initialValues,
} from './constant';

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Add any form submission logic here, e.g., API call
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-bold mb-6">FILL OUR CONTACT FORM</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {contactFormElement.map(field => (
          <div
            key={field.htmlFor}
            className={`grid gap-1.5 ${
              field.htmlFor === 'contactMethod'
                ? 'sm:col-span-2 md:col-span-1 lg:col-span-2'
                : ''
            }`}
          >
            <label className="text-black-50/80" htmlFor={field.htmlFor}>
              {field.label}
            </label>
            {field.type ? (
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.htmlFor as keyof typeof initialValues)}
                className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
              />
            ) : (
              <select
                {...register(field.htmlFor as keyof typeof initialValues)}
                className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
              >
                {field.choices?.map(choice => (
                  <option
                    key={choice.value}
                    value={choice.value}
                    disabled={choice.disabled}
                  >
                    {choice.label}
                  </option>
                ))}
              </select>
            )}
            {errors[field.htmlFor as keyof typeof initialValues] && (
              <p className="text-red-500 text-sm">
                {errors[field.htmlFor as keyof typeof initialValues]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <label className="text-black-50/80" htmlFor="message">
          Message
        </label>
        <textarea
          placeholder="Drop your message"
          {...register('message')}
          className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
        />
      </div>
      <button
        type="submit"
        className="w-full uppercase flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-semibold p-3 rounded-md transition"
      >
        Submit Message
        <ArrowRight absoluteStrokeWidth strokeWidth={3} className="size-4" />
      </button>
    </form>
  );
};

export default ContactForm;
