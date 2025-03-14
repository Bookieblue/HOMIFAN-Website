'use client'
import React, { useState } from 'react';
import { ArrowRight, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  eventFormElement,
  eventSchema,
  eventValues as initialValues,
} from './constants';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EventForm: React.FC<{ toggleModal: () => void; eventId: string | null }> = ({ toggleModal, eventId }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(eventSchema),
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const onSubmit = async (data: any) => {
    if (!eventId) {
      toast.error("No event selected!");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, eventId }), // Include eventId in the payload
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Something went wrong");
  
      toast.success("Event registration successful!");
    } catch (error: any) {
      toast.error(error.message || "Failed to register for event");
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl uppercase font-bold">
            Register for Event
          </h2>
          <div className="cursor-pointer" onClick={toggleModal}>
            <XCircle size={24} />
          </div>
        </div>
        <p>Stay connected to the word of God, no matter where you are.</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-y-6">
        {eventFormElement.map(field => (
          <div
            key={field.htmlFor}
            className={`grid gap-1.5 ${
              field.htmlFor === 'methodOfContact'
                ? 'sm:col-span-2 md:col-span-1 lg:col-span-2'
                : ''
            }`}
          >
            <label className="text-black-50" htmlFor={field.htmlFor}>
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
                  <option key={choice.value} value={choice.value}>
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
      <button
        type="submit"
        disabled={loading}
          className="md:px-4 max-md:w-full uppercase flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-medium p-3 rounded-md transition"
      >
        {loading ? "Submitting..." : "Register Now"}
        {!loading && <ArrowRight absoluteStrokeWidth strokeWidth={2} className="size-4" />}
      </button>
    
    </form>
  );
};

export default EventForm;
