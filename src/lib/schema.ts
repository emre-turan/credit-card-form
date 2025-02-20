import * as z from "zod";

export const cardSchema = z.object({
  number: z
    .string()
    .min(19, "Card number must be complete")
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Invalid card number format"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  expiry: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([2-9]\d)$/,
      "Invalid expiry date format (MM/YY)"
    ),
  cvc: z
    .string()
    .length(3, "CVC must be 3 digits")
    .regex(/^\d+$/, "CVC must contain only numbers"),
});

export type CardFormValues = z.infer<typeof cardSchema>;
