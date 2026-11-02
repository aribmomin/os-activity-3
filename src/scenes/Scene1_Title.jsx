/**
 * Scene 1 — Title / Landing Scene
 * Strictly Bicolor (#004643 & #F0EDE5) with Norwester typography, team badges, and marquee strip.
 */

import { motion } from "framer-motion";
import { groupMembers } from "../data.js";
import { springTransition } from "../utils/theme.jsx";

export default function Scene1_Title() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between py-6">
      {/* Top bar info */}
      <div className="flex items-center justify-between">
        <div className="text-[28px] font-mono tracking-widest opacity-60">
          OPERATING SYSTEMS • LECTURE MODULE
        </div>
        <div className="text-[28px] font-display px-6 py-2 border border-current rounded-full">
          PRESENTER 1 & 2
        </div>
      </div>

      {/* Hero 3-Line Heading */}
      <div className="relative my-auto flex flex-col justify-center">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 numeral-outline font-display text-[320px] select-none opacity-20 pointer-events-none leading-none">
          01
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={springTransition}
            className="font-display text-[156px] leading-[0.84] uppercase"
          >
            FILE-SYSTEM
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="font-display text-[156px] leading-[0.84] uppercase"
          >
            LAYERS &amp;
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="font-display text-[156px] leading-[0.84] uppercase"
          >
            ARCHITECTURE
          </motion.div>
        </div>
      </div>

      {/* Bottom Area: Group Members & Marquee Strip */}
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[24px] font-mono opacity-50">PRESENTATION TEAM:</span>
            <div className="flex items-center gap-4">
              {groupMembers.map((name) => (
                <div
                  key={name}
                  className="px-6 py-2 rounded-full border border-current/30 text-[28px] font-medium card-interactive"
                  data-clickable
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[24px] font-mono opacity-50">AUDIO/VISUAL TIMING</div>
            <div className="text-[32px] font-display">~5:00 TOTAL RUNTIME</div>
          </div>
        </div>

        {/* Bottom Marquee Strip */}
        <div className="w-full overflow-hidden border-t border-current/25 pt-4">
          <div className="marquee-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-8 pr-8 font-display text-[44px] tracking-wider whitespace-nowrap"
              >
                <span>FILE MANAGEMENT</span>
                <span>/</span>
                <span>OPERATING SYSTEMS</span>
                <span>/</span>
                <span>FILE-SYSTEM LAYERS &amp; ARCHITECTURE</span>
                <span>/</span>
                <span>STORAGE ABSTRACTIONS</span>
                <span>/</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
