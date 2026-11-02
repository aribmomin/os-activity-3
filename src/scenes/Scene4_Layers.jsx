/**
 * Scene 4 — The 6 Layers (Centerpiece)
 * Interactive expanding stack representing the 6 primary tiers of the file system.
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
      <div className="w-full h-full flex flex-col justify-between gap-3">
        {sixLayersData.map((layer, idx) => {
          const isActive = idx === activeIdx;

          return (
            <motion.div
              key={layer.id}
              layout
              transition={springTransition}
              onClick={() => setClickedLayerIdx(idx)}
              className={`w-full rounded-2xl border-2 border-[#004643] transition-colors duration-200 cursor-pointer overflow-hidden ${
                isActive
                  ? "bg-[#004643] text-[#F0EDE5] flex-1 py-5 px-8"
                  : "bg-[#F0EDE5] text-[#004643] h-[100px] flex items-center px-8 hover:bg-[#004643]/10"
              }`}
              data-clickable
            >
              {isActive ? (
                /* Expanded Active Layer */
                <div className="w-full h-full flex flex-col justify-between">
                  {/* Top Bar of Active Layer */}
                  <div className="flex items-center justify-between border-b border-[#F0EDE5]/20 pb-3">
                    <div className="flex items-center gap-6">
                      {renderIcon(layer.iconName, { size: 54 })}
                      <span className="font-display text-[64px] leading-none uppercase">
                        {layer.name}
                      </span>
                    </div>
                    <span className="numeral-outline font-display text-[56px] leading-none">
                      LAYER {layer.number}
                    </span>
                  </div>

                  {/* Body Responsibility */}
                  <div className="text-[32px] font-body leading-snug py-2">
                    {layer.responsibility}
                  </div>

                  {/* Facts: Knows vs Doesn't Know */}
                  <div className="grid grid-cols-2 gap-8 pt-2 border-t border-[#F0EDE5]/20">
                    <div className="flex items-start gap-4">
                      <div className="p-2 border border-[#F0EDE5] rounded-full shrink-0">
                        <Check strokeWidth={2} size={32} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display text-[32px]">KNOWS ABOUT</span>
                        <span className="text-[26px] font-body opacity-90">{layer.knows}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 border border-[#F0EDE5] rounded-full shrink-0">
                        <X strokeWidth={2} size={32} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display text-[32px]">DOESN&apos;T KNOW</span>
                        <span className="text-[26px] font-body opacity-90">
                          {layer.doesntKnow}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Terms */}
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-[24px] font-mono opacity-60">KEY CONCEPTS:</span>
                    {layer.keyTerms.map((term) => (
                      <span
                        key={term}
                        className="px-4 py-1 border border-[#F0EDE5]/40 rounded-full font-mono text-[24px]"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* Collapsed Inactive Layer Bar */
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="numeral-outline font-display text-[44px]">
                      {layer.number}
                    </span>
                    {renderIcon(layer.iconName, { size: 44 })}
                    <span className="font-display text-[52px] uppercase">
                      {layer.name}
                    </span>
                  </div>
                  <span className="text-[24px] font-mono uppercase opacity-60">
                    CLICK TO INSPECT RESPONSIBILITY
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
