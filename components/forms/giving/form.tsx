"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { initialValues } from "../constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { givingFormElement, givingSchema } from "./constant";
import { toast} from "react-toastify";
const PaystackPop = require("@paystack/inline-js");


const GivingForm: React.FC = () => {


  
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(givingSchema),
    defaultValues: { ...initialValues, amount: 0 },
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error && Array.isArray(result.error)) {
          // ✅ Display all error messages from the API
          result.error.forEach((err: { field: string; message: string }) => {
            toast.error(`${err.field}: ${err.message}`);
          });
        } else {
          throw new Error(result.message || "Payment processing failed");
        }
        return;
      }

      toast.success("Proceeding to payment...");

      // ✅ Automatically trigger Paystack payment
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        amount: result.data.amount * 100, // Convert to kobo
        email: result.data.email,
        reference: result.data.trxfReference,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        phone: result.data.phoneNumber,
        onSuccess: (trx: any) => {
          toast.success("Payment successful!");
          console.log("Transaction:", trx);
          // You can call your backend here to confirm the transaction
        },
        onCancel: () => {
          toast.error("Payment cancelled!");
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 pb-1 gap-x-3 gap-y-5">
        {givingFormElement.map((field) => (
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
        disabled={loading}
        className="md:px-4 max-md:w-full mt-5 uppercase flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-medium p-3 rounded-md transition"
      >
        {loading ? "Processing..." : "Make Payment Now"}
        {!loading && (
          <ArrowRight absoluteStrokeWidth strokeWidth={2} className="size-4" />
        )}
      </button> 
    </form>
  );
};

export default GivingForm;
