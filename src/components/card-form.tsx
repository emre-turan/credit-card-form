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
  onInputFocus: (field: string) => void;
}

export function CardForm({ form, onInputFocus }: CardFormProps) {
  const { setValue } = form;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted =
      cleaned
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || "";
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      const month = cleaned.substring(0, 2);
      const year = cleaned.substring(2, 4);
      if (Number.parseInt(month) > 12) {
        return "12/" + year;
      }
      return month + (cleaned.length > 2 ? "/" + year : "");
    }
    return cleaned;
  };

  const onSubmit = (data: CardFormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    field.onChange(formatted);
                  }}
                  onFocus={() => onInputFocus("number")}
                  maxLength={19}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Holder Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  onFocus={() => onInputFocus("name")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="MM/YY"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      field.onChange(formatted);
                    }}
                    onFocus={() => onInputFocus("expiry")}
                    maxLength={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .substr(0, 3);
                      field.onChange(value);
                    }}
                    onFocus={() => onInputFocus("cvc")}
                    maxLength={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
