"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CardFormValues } from "@/lib/schema";
import { SubmitButton } from "./submit-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface CardFormProps {
  form: UseFormReturn<CardFormValues>;
  onInputFocusAction: (field: string) => void;
  onInputBlurAction: () => void;
}

export function CardForm({
  form,
  onInputFocusAction,
  onInputBlurAction,
}: CardFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Formats the card number
   * @param value - The card number
   * @returns The formatted card number
   */
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted =
      cleaned
        .match(/.{1,4}/g)
        ?.join(" ")
        .slice(0, 19) || "";
    return formatted;
  };

  /**
   * Formats the expiry date
   * @param value - The expiry date
   * @returns The formatted expiry date
   */
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      const month = cleaned.slice(0, 2);
      const year = cleaned.slice(2, 4);
      if (Number.parseInt(month) > 12) {
        return "12/" + year;
      }
      return month + (cleaned.length > 2 ? "/" + year : "");
    }
    return cleaned;
  };

  /**
   * Formats the card holder name
   * @param value - The card holder name
   * @returns The formatted card holder name
   */
  const formatName = (value: string) => {
    return value.replace(/[^a-zA-Z\s-]/g, "").slice(0, 24);
  };

  /**
   * Handles form submission
   * @param data - The form data
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: CardFormValues) => {
    if (isSubmitting || isSuccess) return;

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200 h-5 sm:h-6 flex items-center text-sm sm:text-base">
                Card Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  className="h-9 sm:h-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm sm:text-base"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    field.onChange(formatted);
                  }}
                  onFocus={() => onInputFocusAction("number")}
                  maxLength={19}
                  disabled={isSubmitting || isSuccess}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200 h-5 sm:h-6 flex items-center text-sm sm:text-base">
                Card Holder Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="h-9 sm:h-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm sm:text-base"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatName(e.target.value);
                    field.onChange(formatted);
                  }}
                  onFocus={() => onInputFocusAction("name")}
                  maxLength={24}
                  disabled={isSubmitting || isSuccess}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200 h-5 sm:h-6 flex items-center text-sm sm:text-base">
                  Expiry Date
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="MM/YY"
                    className="h-9 sm:h-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm sm:text-base"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      field.onChange(formatted);
                    }}
                    onFocus={() => onInputFocusAction("expiry")}
                    onBlur={onInputBlurAction}
                    maxLength={5}
                    disabled={isSubmitting || isSuccess}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200 h-5 sm:h-6 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <span>CVC</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-400 hover:text-zinc-300 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent
                        className="bg-zinc-900 text-zinc-100 border-zinc-800 text-xs sm:text-sm"
                        sideOffset={4}
                      >
                        <p>
                          The 3-digit security code on the back of your card
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    className="h-9 sm:h-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm sm:text-base"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 3);
                      field.onChange(value);
                    }}
                    onFocus={() => onInputFocusAction("cvc")}
                    onBlur={onInputBlurAction}
                    maxLength={3}
                    disabled={isSubmitting || isSuccess}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
      </form>
    </Form>
  );
}
