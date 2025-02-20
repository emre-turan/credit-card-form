"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { CheckMark } from "@/components/check-mark";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isSuccess: boolean;
}

export function SubmitButton({ isSubmitting, isSuccess }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 relative h-10"
      disabled={isSubmitting || isSuccess}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSubmitting ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <LoadingSpinner />
        Processing
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center text-green-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSuccess ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <CheckMark />
        Payment Successful
      </motion.div>

      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: isSubmitting || isSuccess ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        Confirm Payment
      </motion.span>
    </Button>
  );
}
