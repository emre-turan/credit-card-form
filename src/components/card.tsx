"use client";

import { motion } from "framer-motion";
import type { CardFormValues } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface CardProps {
  isFlipped: boolean;
  cardData: Partial<CardFormValues>;
}

export function Card({ isFlipped, cardData }: CardProps) {
  return (
    <div className="relative w-full h-56 [perspective:1000px]">
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "absolute inset-0 rounded-2xl p-6",
          "[transform-style:preserve-3d] [backface-visibility:hidden]"
        )}
      >
        {/* Front of card */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-100 p-6 shadow-xl">
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-8 rounded bg-zinc-700/50" />
              <div className="text-xl tracking-[0.25em] font-mono">
                {cardData.number || "•••• •••• •••• ••••"}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-xs text-zinc-400">Card Holder</p>
                <p className="font-medium uppercase">
                  {cardData.name || "Your Name"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-zinc-400">Expires</p>
                <p className="font-medium">{cardData.expiry || "MM/YY"}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back of card */}
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "absolute inset-0 rounded-2xl [transform-style:preserve-3d] [backface-visibility:hidden]",
          "[transform:rotateY(180deg)]"
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-100 shadow-xl">
          <div className="h-12 bg-zinc-800 mt-8" />
          <div className="px-6 mt-4">
            <div className="h-8 bg-zinc-700/50 flex items-center justify-end px-4">
              <p className="font-medium">{cardData.cvc || "•••"}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
