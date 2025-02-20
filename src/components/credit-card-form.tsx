"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/card";
import { CardForm } from "@/components/card-form";
import { type CardFormValues, cardSchema } from "@/lib/schema";

export function CreditCardForm() {
  const [isFlipped, setIsFlipped] = useState(false);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
  });

  const { watch } = form;
  const cardData = watch();

  const handleInputFocus = (field: string) => {
    setIsFlipped(field === "cvc");
  };

  return (
    <div className="w-full max-w-[500px] space-y-8">
      <div className="relative h-56">
        <AnimatePresence initial={false}>
          <Card isFlipped={isFlipped} cardData={cardData} />
        </AnimatePresence>
      </div>
      <CardForm form={form} onInputFocus={handleInputFocus} />
    </div>
  );
}
