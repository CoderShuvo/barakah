"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/server/actions";
import type { FormSettings } from "@/types";

const services = [
  "Brand Design",
  "Performance Marketing",
  "Website Design",
  "CRO",
  "Website Development",
  "Social Media Marketing",
  "SEO / SEM",
];

const budgets = ["10 - 20k", "20 - 30k", "30 - 40k", "50 - 100k", ">100k"];

interface ContactRedesignFormProps {
  settings?: FormSettings;
}

export function ContactRedesignForm({ settings }: ContactRedesignFormProps) {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    const formPayload = {
      ...data,
      service: selectedServices.join(", ") || data.service || undefined,
      budget: selectedBudget || undefined,
      source:
        typeof window !== "undefined"
          ? document.referrer || "direct"
          : "direct",
    };

    const result = await submitContactForm(formPayload);

    if (result.success) {
      setIsSuccess(true);
      reset();
      setSelectedServices([]);
      setSelectedBudget("");
    } else {
      setError(
        typeof result.error === "string"
          ? result.error
          : "Something went wrong. Please try again.",
      );
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-6"
        >
          <CheckCircle className="h-10 w-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-black text-[#3F1200] mb-4">
          {settings?.success_headline || "Request Sent Successfully!"}
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          {settings?.success_message ||
            "Thank you for reaching out. A Barakah strategist will review your goals and get back to you within 24 hours."}
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-[#E76F3D] font-bold hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-24">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Services Section */}
      {settings?.show_service !== false && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-[#3F1200] font-lato">
            i'm interested in..
          </h3>
          <div className="flex flex-wrap gap-3">
            {services.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={cn(
                  "px-6 py-6 rounded-full border-2 transition-all font-lato font-bold text-sm lg:text-[42px]",
                  selectedServices.includes(service)
                    ? "bg-[#3F1200] border-[#3F1200] text-white"
                    : "border-black text-gray-700 hover:border-black",
                )}
              >
                {service}
              </button>
            ))}
            <button
              type="button"
              className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-lato font-bold text-sm lg:text-base hover:border-[#3F1200]"
            >
              Other
            </button>
          </div>
        </div>
      )}

      {/* Input Grid */}
      <div className="flex flex-col gap-x-8 gap-y-10">
        <div className="space-y-2 border-b-2 border-gray-100 focus-within:border-[#3F1200] transition-colors">
          <input
            {...register("name")}
            placeholder="First Name"
            className="w-full py-4 bg-transparent outline-none text-xl font-medium placeholder:text-gray-300"
          />
        </div>
        <div className="space-y-2 border-b-2 border-gray-100 focus-within:border-[#3F1200] transition-colors">
          <input
            placeholder="Last Name"
            className="w-full py-4 bg-transparent outline-none text-xl font-medium placeholder:text-gray-300"
          />
        </div>
        <div className="space-y-2 border-b-2 border-gray-100 focus-within:border-[#3F1200] transition-colors">
          <input
            {...register("email")}
            type="email"
            placeholder="Business Email"
            className="w-full py-4 bg-transparent outline-none text-xl font-medium placeholder:text-gray-300"
          />
        </div>
        <div className="space-y-2 border-b-2 border-gray-100 focus-within:border-[#3F1200] transition-colors">
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone Number"
            className="w-full py-4 bg-transparent outline-none text-xl font-medium placeholder:text-gray-300"
          />
        </div>
        {settings?.show_company !== false && (
          <div className="border-b-2 border-gray-100 focus-within:border-[#3F1200] transition-colors md:col-span-2">
            <input
              {...register("company")}
              placeholder="Company Name"
              className="w-full py-4 bg-transparent outline-none text-xl font-medium placeholder:text-gray-300"
            />
          </div>
        )}
        <div className="border-b-2 border-gray-100 focus-within:border-[#3F1200] transition-colors md:col-span-2">
          <textarea
            {...register("message")}
            placeholder="Write Down Your Goal"
            rows={1}
            className="w-full py-4 bg-transparent outline-none text-xl font-medium placeholder:text-gray-300 resize-none"
          />
        </div>
      </div>

      {/* Budget Section */}
      {settings?.show_budget !== false && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-[#3F1200] font-lato">
            Monthly Budget
          </h3>
          <div className="flex flex-wrap gap-3">
            {budgets.map((budget) => (
              <button
                key={budget}
                type="button"
                onClick={() => setSelectedBudget(budget)}
                className={cn(
                  "px-6 py-6 rounded-full border-2 transition-all font-lato font-bold text-sm lg:text-[42px]",
                  selectedBudget === budget
                    ? "bg-[#3F1200] border-[#3F1200] text-white"
                    : "border-black text-gray-700 hover:border-black",
                )}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#E76F3D]
    text-white
    font-bold
    text-base sm:text-lg
    rounded-[56px]
    w-full sm:w-auto
    px-[16px] sm:px-[20px]
    py-[6px]
    h-[48px] sm:h-[52px]

    inline-flex
    items-center
    justify-center
    gap-[10px]

    shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]

    hover:bg-[#d46235]
    transition-all"
        >
          <span className="text-xl font-black">
            {isSubmitting
              ? "Sending..."
              : settings?.submit_button_text || "Send Request"}
          </span>
          <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full group-hover:translate-x-1 transition-transform">
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 text-[#E76F3D] animate-spin" />
            ) : (
              <ArrowRight className="h-6 w-6 text-[#E76F3D]" />
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
