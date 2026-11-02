import { motion } from "framer-motion";
import { springTransition } from "../utils/theme.jsx";

export default function HeroHeader({ meta, step, children }) {
  const isHero = step === 0;

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {isHero ? (
        <div className="relative w-full h-full flex flex-col justify-between py-4">
          {/* Top numeral and part badge */}
          <div className="flex items-center justify-between">
            <div className="text-[24px] font-mono tracking-widest opacity-60">
              {meta.subtitle}
            </div>
            <div className="text-[24px] font-display px-5 py-1.5 border border-current rounded-full">
              PART {meta.part}
            </div>
          </div>

          {/* Center Giant Hero lines */}
          <div className="relative my-auto flex flex-col justify-center">
            {/* Outlined Scene Number behind */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 numeral-outline font-display text-[260px] select-none opacity-20 pointer-events-none leading-none">
              0{meta.id}
            </div>

            <div className="flex flex-col overflow-hidden">
              {meta.heroLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ ...springTransition, delay: idx * 0.1 }}
                    className="font-display text-[128px] leading-[0.84] tracking-tight uppercase"
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom helper prompt */}
          <div className="flex items-center justify-between pt-3 border-t border-current/20">
            <div className="text-[22px] font-mono opacity-50">
              PRESS SPACE OR RIGHT ARROW TO PROCEED
            </div>
            <div className="numeral-outline font-display text-[48px] leading-none">
              SCENE 0{meta.id}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col">
          {/* Top Compact Section Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-current/20 shrink-0">
            <div className="flex items-baseline gap-4">
              <span className="numeral-outline font-display text-[64px] leading-none">
                0{meta.id}
              </span>
              <div className="flex flex-col">
                <h2 className="font-display text-[54px] leading-[0.88] uppercase tracking-tight">
                  {meta.title}
                </h2>
                <span className="text-[18px] font-mono opacity-60 mt-0.5">
                  {meta.subtitle}
                </span>
              </div>
            </div>

            <div className="text-[20px] font-display border border-current px-5 py-1.5 rounded-full">
              PART {meta.part} • STEP {step} / {meta.totalSteps - 1}
            </div>
          </div>

          {/* Main Scene Content Container */}
          <div className="flex-1 w-full min-h-0 relative">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
