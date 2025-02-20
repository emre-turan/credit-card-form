"use client";

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
import { Button } from "@/components/ui/button";
import type { CardFormValues } from "@/lib/schema";

interface CardFormProps {
  form: UseFormReturn<CardFormValues>;
  onInputFocusAction: (field: string) => void;
}

export function CardForm({ form, onInputFocusAction }: CardFormProps) {
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted =
      cleaned
        .match(/.{1,4}/g)
        ?.join(" ")
        .slice(0, 19) || "";
    return formatted;
  };

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

  const formatName = (value: string) => {
    return value.replace(/[^a-zA-Z\s-]/g, "").slice(0, 24);
  };

  const onSubmit = (data: CardFormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200">Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    field.onChange(formatted);
                  }}
                  onFocus={() => onInputFocusAction("number")}
                  maxLength={19}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-200">Card Holder Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatName(e.target.value);
                    field.onChange(formatted);
                  }}
                  onFocus={() => onInputFocusAction("name")}
                  maxLength={24}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="MM/YY"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      field.onChange(formatted);
                    }}
                    onFocus={() => onInputFocusAction("expiry")}
                    maxLength={5}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">CVC</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 3);
                      field.onChange(value);
                    }}
                    onFocus={() => onInputFocusAction("cvc")}
                    maxLength={3}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        >
          Confirm Payment
        </Button>
      </form>
    </Form>
  );
}
