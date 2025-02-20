"use client";

import { motion } from "framer-motion";
import type { CardFormValues } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface CardProps {
  isFlipped: boolean;
  cardData: Partial<CardFormValues>;
}

export function Card({ isFlipped, cardData }: CardProps) {
  const formatName = (name: string) => {
    return name.length > 24 ? name.slice(0, 24) : name;
  };

  return (
    <div className="relative w-full h-44 sm:h-56 [perspective:1000px]">
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-[1.25rem] p-4 sm:p-6",
          "[transform-style:preserve-3d] [backface-visibility:hidden]"
        )}
      >
        {/* Front of card */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-[1.25rem] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 text-zinc-100 p-4 sm:p-6 shadow-2xl">
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-4">
              <div className="w-10 sm:w-12 h-6 sm:h-8 rounded bg-zinc-600/50" />
              <div className="text-base sm:text-xl tracking-[0.25em] font-mono">
                {cardData.number || "•••• •••• •••• ••••"}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] sm:text-xs text-zinc-400">
                  Card Holder
                </p>
                <p className="text-sm sm:text-base font-medium uppercase h-5 sm:h-6 overflow-hidden">
                  {cardData.name ? formatName(cardData.name) : "YOUR NAME"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] sm:text-xs text-zinc-400">Expires</p>
                <p className="text-sm sm:text-base font-medium">
                  {cardData.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back of card */}
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-[1.25rem] [transform-style:preserve-3d] [backface-visibility:hidden]",
          "[transform:rotateY(180deg)]"
        )}
      >
        <div className="absolute inset-0 rounded-2xl sm:rounded-[1.25rem] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 text-zinc-100 shadow-2xl">
          <div className="h-8 sm:h-12 bg-zinc-900 mt-6 sm:mt-8" />
          <div className="px-4 sm:px-6 mt-3 sm:mt-4">
            <div className="h-6 sm:h-8 bg-zinc-600/50 flex items-center justify-end px-4">
              <p className="text-sm sm:text-base font-medium">
                {cardData.cvc || "•••"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
