/**
 * Scene 3 — Why Layers?
 * Monolithic Nightmare vs Layered Abstraction with 4 core architectural pillars.
 * Balanced height layout with roomy padding and no vertical overflow.
 */

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { springTransition } from "../utils/theme.jsx";

export default function Scene3_WhyLayers({ meta, step }) {
  return (
    <HeroHeader meta={meta} step={step}>
      <div className="w-full h-full flex flex-col justify-between">
        {/* Top Split: Monolith vs Layered Stack */}
        <div className="grid grid-cols-2 gap-8 flex-1 pb-4 min-h-0">
          {/* Monolithic Nightmare Box */}
          <motion.div
            animate={{
              opacity: step === 1 ? 1 : step > 1 ? 0.35 : 1,
              scale: step === 1 ? 1 : 0.98
            }}
            transition={springTransition}
            className={`border-2 p-6 rounded-2xl flex flex-col justify-between card-interactive transition-colors ${
              step === 1 ? "border-current bg-current/10" : "border-current/30"
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/20 pb-3">
              <span className="font-display text-[38px] leading-none">THE MONOLITHIC NIGHTMARE</span>
              <X strokeWidth={2} size={36} />
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-3 my-3 p-4 border-2 border-dashed border-current/30 rounded-xl bg-current/5">
              <div className="font-mono text-[22px] text-center leading-relaxed font-semibold">
                App Logic ⟷ Cache Management ⟷ Sector Allocation ⟷ Hardware Drivers ⟷ Metadata
              </div>
              <div className="font-mono text-[16px] opacity-70">
                [ Tightly Coupled Spaghetti Code • Zero Separation of Concerns ]
              </div>
            </div>

            <div className="text-[20px] font-body opacity-85 border-t border-current/20 pt-2">
              A bug in driver timing corrupts directory structures; adding NVMe breaks all application APIs.
            </div>
          </motion.div>

          {/* Clean Layered Stack */}
          <motion.div
            animate={{
              opacity: step === 2 || step >= 3 ? 1 : 0.35,
              scale: step === 2 ? 1 : 0.98
            }}
            transition={springTransition}
            className={`border-2 p-6 rounded-2xl flex flex-col justify-between bg-current/10 card-interactive transition-colors ${
              step >= 2 ? "border-current" : "border-current/30"
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/20 pb-3">
              <span className="font-display text-[38px] leading-none">THE LAYERED ABSTRACTION</span>
              <Check strokeWidth={2} size={36} />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-2 my-3">
              {[
                "APPLICATION PROGRAMS",
                "LOGICAL FILE SYSTEM",
                "FILE-ORGANIZATION MODULE",
                "BASIC FILE SYSTEM",
                "I/O CONTROL",
                "STORAGE DEVICES"
              ].map((layer, idx) => (
                <div
                  key={layer}
                  className="px-4 py-1.5 border border-current rounded-lg flex items-center justify-between font-display text-[22px]"
                >
                  <span>{layer}</span>
                  <span className="font-mono text-[16px] opacity-50">TIER 0{idx + 1}</span>
                </div>
              ))}
            </div>

            <div className="text-[20px] font-body opacity-85 border-t border-current/20 pt-2">
              Each layer communicates exclusively with immediately adjacent tiers via standardized contracts.
            </div>
          </motion.div>
        </div>

        {/* Bottom 4 Pillars Section */}
        <div className="border-t-2 border-current/20 pt-4 grid grid-cols-4 gap-4 shrink-0">
          <div className="p-4 border-2 border-current rounded-xl card-interactive" data-clickable>
            <div className="font-display text-[40px] leading-none">MODULARITY</div>
            <div className="text-[17px] font-body opacity-80 mt-1.5 leading-snug">
              Isolated responsibilities; replace any module without side-effects.
            </div>
          </div>

          <div className="p-4 border-2 border-current rounded-xl card-interactive" data-clickable>
            <div className="font-display text-[40px] leading-none">REUSE</div>
            <div className="text-[17px] font-body opacity-80 mt-1.5 leading-snug">
              Single buffer cache &amp; VFS serve ext4, NTFS, FAT32, and NFS.
            </div>
          </div>

          <div className="p-4 border-2 border-current rounded-xl card-interactive" data-clickable>
            <div className="font-display text-[40px] leading-none">EASY DEBUG</div>
            <div className="text-[17px] font-body opacity-80 mt-1.5 leading-snug">
              Isolate faults strictly to block mapping, driver interrupts, or inodes.
            </div>
          </div>

          <div
            className="p-4 border-2 border-current rounded-xl card-interactive bg-current/10"
            data-clickable
          >
            <div className="numeral-outline font-display text-[40px] leading-none">OVERHEAD</div>
            <div className="text-[17px] font-body opacity-80 mt-1.5 leading-snug">
              The engineering cost: function indirection &amp; call latency per tier.
            </div>
          </div>
        </div>
      </div>
    </HeroHeader>
  );
}
