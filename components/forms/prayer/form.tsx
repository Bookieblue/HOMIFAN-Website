'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  prayerSchema,
  prayerFormElement,
  prayerValues as initialValues,
} from './constant';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrayerForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(prayerSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prayer-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
  
      toast.success("Prayer request submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className="md:px-4 max-md:w-full uppercase flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-medium p-3 rounded-md transition"
      >
        {loading ? "Submitting..." : "Submit Request"}
        {!loading && <ArrowRight absoluteStrokeWidth strokeWidth={2} className="size-4" />}
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default PrayerForm;
