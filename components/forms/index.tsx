'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialValues, membershipFormElement, schema } from './constants';

const MembershipForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Add any form submission logic here, e.g., API call
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2 space-y-4 p-6 bg-gray-100 rounded-md"
    >
      <h2 className="text-3xl uppercase font-semibold">Become a Member</h2>
      <p className="text-gray-600">
        Are you ready to take the next step and officially become part of our
        church family? Fill out this form to express your interest!
      </p>
      <div className="grid sm:grid-cols-2 pb-1 gap-x-3 gap-y-5">
        {membershipFormElement.map(field => (
          <div key={field.htmlFor} className="grid gap-1.5">
            <label className="text-black-50/80" htmlFor={field.htmlFor}>
              {field.label}
            </label>
            {field.type ? (
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.htmlFor)}
                className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
              />
            ) : (
              <select
                {...register(field.htmlFor)}
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
            {errors[field.htmlFor] && (
              <p className="text-red-500 text-sm">
                {errors[field.htmlFor]?.message}
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
        className="w-full flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-semibold p-3 rounded-md transition"
      >
        Submit Form
        <ArrowRight absoluteStrokeWidth strokeWidth={3} className="size-4" />
      </button>
    </form>
  );
};

export default MembershipForm;
