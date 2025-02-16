"use client";
import React, { useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  membershipSchema,
  membershipFormElement,
  membershipValues as initialValues,
} from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MembershipForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(membershipSchema),
  });

  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/members`, {
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

      toast.success("Membership request submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2 space-y-4 p-3 lg:p-6 bg-gray-100 rounded-md"
    >
      <h2 className="text-3xl uppercase font-semibold">Become a Member</h2>
      <p className="text-gray-600">
        Are you ready to take the next step and officially become part of our
        church family? Fill out this form to express your interest!
      </p>
      <div className="grid sm:grid-cols-2 pb-1 gap-x-3 gap-y-5">
        {membershipFormElement.map((field) => (
          <div key={field.htmlFor} className="grid gap-1.5">
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
                {field.choices?.map((choice) => (
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
      
      <button
        type="submit"
        className="w-full flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-semibold p-3 rounded-md transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Form
            <ArrowRight absoluteStrokeWidth strokeWidth={2} className="size-4" />
          </>
        )}
      </button>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default MembershipForm;
