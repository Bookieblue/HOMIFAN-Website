'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  contactSchema,
  contactFormElement,
  contactValues as initialValues,
} from './constant';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(contactSchema),
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const onSubmit = async (data: any) => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact-us`, {
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

    toast.success("Message submitted successfully!");
  } catch (error: any) {
    toast.error(error.message || "Failed to submit message");
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-bold mb-6">FILL OUR CONTACT FORM</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {contactFormElement.map(field => (
          <div
            key={field.htmlFor}
            className={`grid gap-1.5 ${
              field.htmlFor === 'methodOfContact'
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
        disabled={loading}
         className="md:px-4 max-md:w-full uppercase flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-medium p-3 rounded-md transition"
      >
        {loading ? "Submitting..." : "Submit Message"}
        {!loading && <ArrowRight absoluteStrokeWidth strokeWidth={2} className="size-4" />}
      </button>
    </form>
  );
};

export default ContactForm;
