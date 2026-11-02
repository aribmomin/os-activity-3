/**
 * Scene 8 — Summary & Key Takeaways
 * 4 core principles grid transitioning to full-bleed Thank You / Questions slide.
 * Proportional layout eliminating any bottom cut-off or text overlap.
 */

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { springTransition } from "../utils/theme.jsx";
import { summaryTakeaways } from "../data.js";

export default function Scene8_Summary({ meta, step, onRestart }) {
  const isClosingHero = step >= 2;

  return (
    <HeroHeader meta={meta} step={step}>
      {isClosingHero ? (
        /* Closing Hero Thank You */
        <div className="w-full h-full flex flex-col justify-between py-4">
          <div className="flex items-center justify-between border-b border-current/20 pb-3">
            <span className="text-[22px] font-mono opacity-60">
              OPERATING SYSTEMS • LECTURE SUMMARY
            </span>
            <span className="text-[22px] font-display border border-current px-5 py-1 rounded-full">
              CONCLUSION
            </span>
          </div>

          <div className="relative my-auto flex flex-col justify-center">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={springTransition}
                className="font-display text-[130px] leading-[0.84] uppercase"
              >
                THANK YOU.
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ ...springTransition, delay: 0.1 }}
                className="numeral-outline font-display text-[130px] leading-[0.84] uppercase"
              >
                QUESTIONS?
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-current/20">
            <div className="flex flex-col gap-0.5">
              <div className="text-[26px] font-display">
                PART A: PRESENTER 1 • PART B: PRESENTER 2
              </div>
              <div className="text-[20px] font-mono opacity-60">
                Operating Systems • File-System Layers &amp; Architecture
              </div>
            </div>

            <button
              onClick={onRestart}
              className="flex items-center gap-3 px-6 py-3 border-2 border-current rounded-xl card-interactive font-display text-[26px]"
              data-clickable
            >
              <RotateCcw strokeWidth={2} size={28} />
              RESTART PRESENTATION
            </button>
          </div>
        </div>
      ) : (
        /* 4 Takeaways Grid */
        <div className="w-full h-full grid grid-cols-2 gap-6">
          {summaryTakeaways.map((t) => (
            <div
              key={t.num}
              className="p-6 rounded-2xl border-2 border-current flex flex-col justify-between bg-current/5 card-interactive"
              data-clickable
            >
              <div className="flex items-center justify-between border-b border-current/20 pb-3">
                <span className="numeral-outline font-display text-[54px] leading-none">
                  {t.num}
                </span>
                <span className="font-mono text-[18px] opacity-50 uppercase">
                  Core Principle
                </span>
              </div>

              <div className="my-auto py-2">
                <div className="font-display text-[40px] leading-tight mb-2">
                  {t.title}
                </div>
                <div className="text-[22px] font-body opacity-90 leading-snug">
                  {t.desc}
                </div>
              </div>

              <div className="text-[17px] font-mono opacity-50 border-t border-current/15 pt-2">
                VERIFIED ARCHITECTURE
              </div>
            </div>
          ))}
        </div>
      )}
    </HeroHeader>
  );
}
