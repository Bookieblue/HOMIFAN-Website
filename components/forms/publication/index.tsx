'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  publicationFormElement,
  publicationSchema,
  publicationValues as initialValues,
} from './constant';
import { toast } from 'react-toastify';

const PublicationForm: React.FC<{
  toggleModal: () => void;
  bookId: string;
}> = ({ toggleModal, bookId }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(publicationSchema),
  });

  const [loading, setLoading] = useState(false);

  const [PaystackPop, setPaystackPop] = useState<any>(null);

  useEffect(() => {
    import("@paystack/inline-js").then((module) => {
      setPaystackPop(() => module.default); // Set it as a function
    });
  }, []);


  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const onSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    setLoading(true);

    try {
      const payload = {
        ...data,
        publicationType: data.pubType,
        bookId:'2eb4a54a-f491-492a-bedd-99bbbf5a9c79',
      }
      const response = await fetch(`${API_BASE_URL}/api/books/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (result.error && Array.isArray(result.error)) {
          result.error.forEach((err: { field: string; message: string }) => {
            toast.error(`${err.field}: ${err.message}`);
          });
        } else {
          throw new Error(result.message || "Payment processing failed");
        }
        return;
      }

      toast.success("Proceeding to payment...");

      if (!PaystackPop) {
        toast.error("Payment SDK not loaded");
        return;
      }

      const trx = result.data.reference;  

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        amount: result.data.amount * 100, // Convert to kobo
        email: result.data.metadata.email,
        reference: trx,
        firstName: result.data.metadata.firstName,
        lastName: result.data.metadata.lastName,
        phone: result.data.metadata.phoneNumber,

        onSuccess: async (transaction: any) => {
          toast.success("Payment successful!");
          console.log("Transaction object:", transaction);

         
          try {
            const response = await fetch(`${API_BASE_URL}/api/payments/verify/${transaction.trxref}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" }
            });
      
            const result = await response.json();
      
            if (!response.ok) {
              if (result.error && Array.isArray(result.error)) {
                result.error.forEach((err: { field: string; message: string }) => {
                  toast.error(`${err.field}: ${err.message}`);
                });
              } else {
                throw new Error(result.message || "Could not verify transaction");
              }
              setLoading(false);
              return;
            }
            setLoading(false);
          } catch (error) {
            toast.error("Could not verify transaction");
            setLoading(false);
          }
        },
        onCancel: () => {
          toast.error("Payment cancelled!");
        },
      });
      console.log('Response:', result);
    } catch (error:any) {
      toast.error(error.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl uppercase font-bold">
            Fill Publication Form
          </h2>
          <div className="cursor-pointer" onClick={toggleModal}>
            <XCircle size={24} />
          </div>
        </div>
        <p>Get the publication in any format you need.</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-y-6">
        {publicationFormElement.map(field => (
          <div
            key={field.htmlFor}
            className={`grid gap-1.5 ${
              field.htmlFor === 'pubType'
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
      <div>
        <label className="text-black-50" htmlFor="message">
          Additional Information
        </label>
        <textarea
          placeholder="Drop your message"
          {...register('message')}
          className="w-full bg-transparent outline-none border-black-50 border rounded-xl indent-4 py-2.5"
        />
      </div>
      <button
        type="submit"
        className="md:px-6 max-md:w-full uppercase flex gap-2 items-center justify-center outline-none bg-purple-50 text-white font-medium p-3 rounded-md transition"
      >
        {loading ? "Processing..." : "Buy Now"}
        <ArrowRight absoluteStrokeWidth strokeWidth={2} className="size-4" />
      </button>
    </form>
  );
};

export default PublicationForm;
