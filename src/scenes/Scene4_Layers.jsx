/**
 * Scene 4 — The 6 Layers (Centerpiece)
 * Interactive expanding stack representing the 6 primary tiers of the file system.
 * Optimized heights so all 6 tiers fit comfortably on screen without bottom clipping.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { renderIcon, springTransition } from "../utils/theme.jsx";
import { sixLayersData } from "../data.js";

export default function Scene4_Layers({ meta, step }) {
  const [clickedLayerIdx, setClickedLayerIdx] = useState(null);
  const [prevStep, setPrevStep] = useState(step);

  if (prevStep !== step) {
    setPrevStep(step);
    setClickedLayerIdx(null);
  }

  const activeIdx =
    clickedLayerIdx !== null ? clickedLayerIdx : Math.min(Math.max(0, step - 1), 5);

  return (
    <HeroHeader meta={meta} step={step}>
      <div className="w-full h-full flex flex-col justify-between gap-2.5">
        {sixLayersData.map((layer, idx) => {
          const isActive = idx === activeIdx;

          return (
            <motion.div
              key={layer.id}
              layout
              transition={springTransition}
              onClick={() => setClickedLayerIdx(idx)}
              className={`w-full rounded-xl border-2 border-[#004643] transition-colors duration-200 cursor-pointer overflow-hidden ${
                isActive
                  ? "bg-[#004643] text-[#F0EDE5] flex-1 py-4 px-6 flex flex-col justify-between"
                  : "bg-[#F0EDE5] text-[#004643] h-[64px] shrink-0 flex items-center px-6 hover:bg-[#004643]/10"
              }`}
              data-clickable
            >
              {isActive ? (
                /* Expanded Active Layer */
                <div className="w-full h-full flex flex-col justify-between">
                  {/* Top Bar of Active Layer */}
                  <div className="flex items-center justify-between border-b border-[#F0EDE5]/20 pb-2">
                    <div className="flex items-center gap-4">
                      {renderIcon(layer.iconName, { size: 40 })}
                      <span className="font-display text-[46px] leading-none uppercase">
                        {layer.name}
                      </span>
                    </div>
                    <span className="numeral-outline font-display text-[40px] leading-none">
                      LAYER {layer.number}
                    </span>
                  </div>

                  {/* Body Responsibility */}
                  <div className="text-[23px] font-body leading-snug py-1">
                    {layer.responsibility}
                  </div>

                  {/* Facts: Knows vs Doesn't Know */}
                  <div className="grid grid-cols-2 gap-6 py-2 border-t border-[#F0EDE5]/20">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 border border-[#F0EDE5] rounded-full shrink-0">
                        <Check strokeWidth={2} size={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display text-[24px]">KNOWS ABOUT</span>
                        <span className="text-[18px] font-body opacity-90">{layer.knows}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 border border-[#F0EDE5] rounded-full shrink-0">
                        <X strokeWidth={2} size={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display text-[24px]">DOESN&apos;T KNOW</span>
                        <span className="text-[18px] font-body opacity-90">
                          {layer.doesntKnow}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Terms */}
                  <div className="flex items-center gap-3 pt-1 border-t border-[#F0EDE5]/20">
                    <span className="text-[16px] font-mono opacity-60">KEY CONCEPTS:</span>
                    {layer.keyTerms.map((term) => (
                      <span
                        key={term}
                        className="px-3 py-0.5 border border-[#F0EDE5]/40 rounded-full font-mono text-[16px]"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* Collapsed Inactive Layer Bar */
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="numeral-outline font-display text-[30px]">
                      {layer.number}
                    </span>
                    {renderIcon(layer.iconName, { size: 28 })}
                    <span className="font-display text-[32px] uppercase">
                      {layer.name}
                    </span>
                  </div>
                  <span className="text-[16px] font-mono uppercase opacity-50">
                    CLICK TO EXPAND
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </HeroHeader>
  );
}
