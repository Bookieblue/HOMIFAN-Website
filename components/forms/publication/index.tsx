"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  publicationFormElement,
  publicationSchema,
  publicationValues as initialValues,
} from "./constant";
import { toast } from "react-toastify";

const PublicationForm: React.FC<{
  toggleModal: () => void;
  bookId: string;
}> = ({ toggleModal, bookId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(publicationSchema),
  });

  // Watch for changes in publication type and useCustomerAddress
  const publicationType = watch("pubType");
  const useCustomerAddress = watch("useCustomerAddress");

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
    console.log("Form submitted:", data);
    setLoading(true);

    try {
      // Prepare the payload
      const payload: any = {
        ...data,
        publicationType: data.pubType,
        bookId: bookId, // Use the bookId prop instead of hardcoded value
        useCustomerAddress: data.useCustomerAddress,
        additionalInfo: data.message,
      };

      // Add delivery address if needed for print books
      if (data.pubType === "Print") {
        if (!data.useCustomerAddress) {
          // Use custom delivery address
          payload.deliveryAddress = {
            street: data.deliveryStreet,
            city: data.deliveryCity,
            state: data.deliveryState,
            postalCode: data.deliveryPostalCode,
            country: data.deliveryCountry,
          };
        }
      }
      const response = await fetch(`${API_BASE_URL}/api/books/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
            const response = await fetch(
              `${API_BASE_URL}/api/payments/verify/${transaction.trxref}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }
            );

            const result = await response.json();

            if (!response.ok) {
              if (result.error && Array.isArray(result.error)) {
                result.error.forEach(
                  (err: { field: string; message: string }) => {
                    toast.error(`${err.field}: ${err.message}`);
                  }
                );
              } else {
                throw new Error(
                  result.message || "Could not verify transaction"
                );
              }
              
              return;
            }

            toast.success("Payment verified successfully!");
            
          } catch (error) {
            toast.error("Could not verify transaction");
            setLoading(false);
          }
        },
        onCancel: () => {
          toast.error("Payment cancelled!");
        },
      });
      console.log("Response:", result);
    } catch (error: any) {
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
        {publicationFormElement.map((field) => (
          <div
            key={field.htmlFor}
            className={`grid gap-1.5 ${
              field.htmlFor === "pubType"
                ? "sm:col-span-2 md:col-span-1 lg:col-span-2"
                : ""
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
                {field.choices?.map((choice) => (
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
      {/* Publication Type Checkbox for Print Books */}
      {publicationType === "Print" && (
        <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="useCustomerAddress"
              {...register("useCustomerAddress")}
              className="w-4 h-4"
            />
            <label htmlFor="useCustomerAddress" className="text-black-50">
              Use my contact address for delivery
            </label>
          </div>

          {/* Delivery Address Fields - Only show if not using customer address */}
          {!useCustomerAddress && (
            <div className="grid sm:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold sm:col-span-2">
                Delivery Address
              </h3>

              <div className="grid gap-1.5 sm:col-span-2">
                <label className="text-black-50" htmlFor="deliveryStreet">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  {...register("deliveryStreet")}
                  className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                />
                {errors.deliveryStreet && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryStreet.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label className="text-black-50" htmlFor="deliveryCity">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  {...register("deliveryCity")}
                  className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                />
                {errors.deliveryCity && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryCity.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label className="text-black-50" htmlFor="deliveryState">
                  State/Province
                </label>
                <input
                  type="text"
                  placeholder="State"
                  {...register("deliveryState")}
                  className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                />
                {errors.deliveryState && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryState.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label className="text-black-50" htmlFor="deliveryPostalCode">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  {...register("deliveryPostalCode")}
                  className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                />
                {errors.deliveryPostalCode && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryPostalCode.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label className="text-black-50" htmlFor="deliveryCountry">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  {...register("deliveryCountry")}
                  className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                />
                {errors.deliveryCountry && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryCountry.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <label className="text-black-50" htmlFor="message">
          Additional Information
        </label>
        <textarea
          placeholder="Drop your message"
          {...register("message")}
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
