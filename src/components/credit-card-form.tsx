"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "./card";
import { CardForm } from "./card-form";
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

  /**
   * Handles input focus event by flipping the card to show the back face
   * @param field - The field that is being focused on
   */
  const handleInputFocus = (field: string) => {
    setIsFlipped(field === "cvc");
  };

  /**
   * Handles input blur event by resetting the card flip state to show the front face
   */
  const handleInputBlur = () => {
    setIsFlipped(false);
  };

  return (
    <div className="space-y-8">
      <div className="relative h-56 -mt-20 mb-12">
        <AnimatePresence initial={false}>
          <Card isFlipped={isFlipped} cardData={cardData} />
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-800/50 rounded-xl p-6 backdrop-blur-sm"
      >
        <CardForm
          form={form}
          onInputFocusAction={handleInputFocus}
          onInputBlurAction={handleInputBlur}
        />
      </motion.div>
    </div>
  );
}
