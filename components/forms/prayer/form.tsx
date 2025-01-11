'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  prayerSchema,
  prayerFormElement,
  prayerValues as initialValues,
} from './constant';

const PrayerForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(prayerSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Add any form submission logic here, e.g., API call
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-4">FILL OUR PRAYER REQUEST FORM</h2>
      <div className="grid sm:grid-cols-2 pb-1 max-md:gap-x-3 gap-5">
        {prayerFormElement.map(field => (
          <div
            key={field.htmlFor}
            className={`grid gap-1.5 ${field.htmlFor === 'contactMethod' ? 'sm:col-span-2' : ''}`}
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
      <div className="">
        <label className="text-black-50/80" htmlFor="prayerRequest">
          Prayer Requests
        </label>
        <textarea
          placeholder="Drop prayer request"
          {...register('prayerRequest')}
          className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
        />
      </div>
      <button
        type="submit"
        className="w-full flex uppercase gap-2 items-center justify-center outline-none bg-purple-50 text-white font-semibold p-3 rounded-md transition"
      >
        Submit Request
        <ArrowRight absoluteStrokeWidth strokeWidth={3} className="size-4" />
      </button>
    </form>
  );
};

export default PrayerForm;
