/**
 * Scene 5 — Live Trace of read("notes.txt", byte 5000)
 * Step-by-step traversal down to disk media and back up to user memory.
 * Optimized height layout with balanced typography and room for formulas and stamps.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowDown, ArrowUp } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { renderIcon, springTransition } from "../utils/theme.jsx";
import { sixLayersData, traceStepsData } from "../data.js";

export default function Scene5_LiveTrace({ meta, step }) {
  const [internalStep, setInternalStep] = useState(null);
  const [prevStep, setPrevStep] = useState(step);

  if (prevStep !== step) {
    setPrevStep(step);
    setInternalStep(null);
  }

  const activeStepIdx =
    internalStep !== null ? internalStep : Math.min(Math.max(1, step), 7);
  const currentTrace = traceStepsData[activeStepIdx - 1] || traceStepsData[0];

  return (
    <HeroHeader meta={meta} step={step}>
      <div className="w-full h-full flex flex-col justify-between gap-4">
        {/* Top Control Bar with Replay Button */}
        <div className="flex items-center justify-between py-2 px-5 border-2 border-current/30 rounded-xl bg-current/5 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-display text-[32px] uppercase">OPERATION:</span>
            <span className="font-mono text-[24px] px-4 py-0.5 border border-current rounded-lg font-bold">
              read(&quot;notes.txt&quot;, byte 5000)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setInternalStep(1)}
              className="flex items-center gap-2 px-4 py-1.5 border-2 border-current rounded-lg card-interactive font-display text-[20px]"
              data-clickable
            >
              <RotateCcw strokeWidth={2} size={22} />
              REPLAY TRACE
            </button>
            <div className="font-mono text-[20px] opacity-70">
              STEP {activeStepIdx} OF 7
            </div>
          </div>
        </div>

        {/* Center Vertical Stack & Packet Traversal */}
        <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Left Vertical Track (6 Layers Stack) */}
          <div className="col-span-5 flex flex-col justify-between relative pl-10">
            {/* Traversal Lines (Solid Down, Dashed Up) */}
            <div className="absolute left-5 top-6 bottom-6 w-1 bg-current" />
            <div className="absolute left-7 top-6 bottom-6 w-1 border-r-2 border-dashed border-current opacity-70" />

            {/* Traveling Circular Packet */}
            <motion.div
              layout
              transition={springTransition}
              style={{
                top: `${((currentTrace.packetPos) / 5) * 80 + 3}%`
              }}
              className="absolute left-0 w-12 h-12 rounded-full border-3 border-current bg-current flex items-center justify-center text-[var(--bg)] z-20 shadow-md"
            >
              {currentTrace.direction === "down" ? (
                <ArrowDown strokeWidth={2.5} size={26} />
              ) : (
                <ArrowUp strokeWidth={2.5} size={26} />
              )}
            </motion.div>

            {sixLayersData.map((layer, idx) => {
              const isLayerActive = currentTrace.layerId === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setInternalStep(idx + 1)}
                  className={`py-2 px-4 rounded-xl border-2 border-current transition-colors flex items-center justify-between cursor-pointer ${
                    isLayerActive
                      ? "bg-current text-[var(--bg)] font-bold shadow-none"
                      : "bg-transparent opacity-60 hover:opacity-100"
                  }`}
                  data-clickable
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[18px]">0{idx + 1}</span>
                    <span className="font-display text-[26px] leading-none uppercase">
                      {layer.name}
                    </span>
                  </div>
                  {renderIcon(layer.iconName, { size: 26 })}
                </div>
              );
            })}
          </div>

          {/* Right Inspection & Execution Panel */}
          <div className="col-span-7 flex flex-col justify-between p-6 border-2 border-current rounded-2xl bg-current/5">
            {/* Step Caption */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-current/20 pb-2">
                <span className="font-display text-[32px]">{currentTrace.title}</span>
                <span className="font-mono text-[18px] opacity-60 uppercase">
                  {currentTrace.direction === "down"
                    ? "Solid Line: Request"
                    : "Dashed Line: Return"}
                </span>
              </div>
              <div className="font-body text-[26px] leading-snug pt-1">
                {currentTrace.caption}
              </div>
            </div>

            {/* Calculation / Formula */}
            <div className="my-auto p-4 border-2 border-current rounded-xl bg-current/10 flex flex-col justify-center">
              <div className="text-[16px] font-mono opacity-60 mb-1">
                CALCULATION / KERNEL ACTION:
              </div>
              <div className="font-mono text-[34px] leading-tight font-bold tracking-tight">
                {currentTrace.formula}
              </div>
            </div>

            {/* Stamp Box for CACHE MISS on step 4 */}
            {currentTrace.isStamp && (
              <div className="self-start stamp-box px-6 py-2 rounded-lg font-display text-[40px] text-current font-bold my-1">
                CACHE MISS
              </div>
            )}

            {/* Return Path Notification */}
            <div className="text-[18px] font-body opacity-80 border-t border-current/20 pt-3 flex items-center gap-3">
              <span className="font-mono text-[16px] px-2.5 py-0.5 border border-current rounded">
                PATH
              </span>
              <span>
                {currentTrace.direction === "down"
                  ? "Traversing DOWN through abstraction stack toward disk media."
                  : "Returning UP through buffers into user memory address space."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </HeroHeader>
  );
}
