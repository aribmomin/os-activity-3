/**
 * Scene 2 — What is File Management?
 * User View vs Disk Reality, bridge band, and 6 core responsibilities revealed step-by-step.
 * Optimized height layout to eliminate clipping and congestion.
 */

import { motion } from "framer-motion";
import { FileText, FileCode, Folder } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { renderIcon, springTransition } from "../utils/theme.jsx";
import { fileManagementResponsibilities } from "../data.js";

export default function Scene2_FileManagement({ meta, step }) {
  const visibleResponsibilities = Math.max(0, step);

  return (
    <HeroHeader meta={meta} step={step}>
      <div className="w-full h-full flex flex-col justify-between gap-4">
        {/* Split Screen Top Section (h-[240px]) */}
        <div className="grid grid-cols-2 gap-6 h-[240px] shrink-0">
          {/* Left: User View */}
          <div className="p-5 border-2 border-[#004643]/30 rounded-2xl flex flex-col justify-between bg-[#F0EDE5] card-interactive">
            <div className="flex items-center justify-between border-b border-[#004643]/20 pb-2">
              <span className="font-display text-[36px] leading-none">USER VIEW</span>
              <span className="text-[16px] font-mono uppercase opacity-70">Logical Abstraction</span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-auto">
              <div className="p-3 border border-[#004643]/20 rounded-xl flex flex-col items-center gap-1 bg-[#004643]/5">
                <FileText strokeWidth={2} size={32} />
                <span className="font-mono text-[18px] font-semibold">notes.txt</span>
                <span className="text-[15px] opacity-60">5,000 bytes</span>
              </div>
              <div className="p-3 border border-[#004643]/20 rounded-xl flex flex-col items-center gap-1 bg-[#004643]/5">
                <FileCode strokeWidth={2} size={32} />
                <span className="font-mono text-[18px] font-semibold">report.pdf</span>
                <span className="text-[15px] opacity-60">1.2 MB</span>
              </div>
              <div className="p-3 border border-[#004643]/20 rounded-xl flex flex-col items-center gap-1 bg-[#004643]/5">
                <Folder strokeWidth={2} size={32} />
                <span className="font-mono text-[18px] font-semibold">/home/docs</span>
                <span className="text-[15px] opacity-60">Directory</span>
              </div>
            </div>

            <div className="text-[18px] font-body opacity-80 border-t border-[#004643]/20 pt-2">
              Abstract, linear, named byte streams with human semantics.
            </div>
          </div>

          {/* Right: Disk Reality */}
          <div className="p-5 border-2 border-[#004643] bg-[#004643] text-[#F0EDE5] rounded-2xl flex flex-col justify-between card-interactive">
            <div className="flex items-center justify-between border-b border-[#F0EDE5]/20 pb-2">
              <span className="font-display text-[36px] leading-none">DISK REALITY</span>
              <span className="text-[16px] font-mono uppercase opacity-70">Physical Hardware</span>
            </div>

            <div className="grid grid-cols-4 gap-2 font-mono text-[16px] text-center my-auto">
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/5">[Blk 0104]</div>
              <div className="p-2 border border-[#F0EDE5] rounded bg-[#F0EDE5]/25 font-bold">[Blk 8812]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/5">[Blk 4096]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/5">[Blk 0019]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/5">[Blk 5120]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/5">[Blk 7731]</div>
              <div className="p-2 border border-[#F0EDE5] rounded bg-[#F0EDE5]/25 font-bold">[Blk 8813]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/5">[Blk 9002]</div>
            </div>

            <div className="text-[18px] font-body opacity-80 border-t border-[#F0EDE5]/20 pt-2">
              Unordered, raw 4KB blocks across platters and flash cells.
            </div>
          </div>
        </div>

        {/* Center File Management Bridge Band */}
        <div className="w-full py-2 px-6 border-y-2 border-current flex items-center justify-between bg-current/5 shrink-0">
          <span className="font-display text-[26px] tracking-wider">
            FILE MANAGEMENT SYSTEM BRIDGE
          </span>
          <span className="font-mono text-[18px] opacity-70">
            TRANSLATES SYMBOLIC OPERATIONS INTO SECTOR COMMANDS
          </span>
        </div>

        {/* Six Responsibilities revealed per step */}
        <div className="grid grid-cols-6 gap-3 flex-1 min-h-0">
          {fileManagementResponsibilities.map((resp, i) => {
            const isRevealed = i < visibleResponsibilities;
            return (
              <motion.div
                key={resp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: isRevealed ? 1 : 0.25,
                  y: isRevealed ? 0 : 8
                }}
                transition={springTransition}
                className={`p-4 rounded-xl border-2 border-[#004643]/30 flex flex-col justify-between card-interactive ${
                  isRevealed ? "bg-[#004643]/5" : "opacity-30"
                }`}
                data-clickable
              >
                <div className="flex items-center justify-between border-b border-current/15 pb-2">
                  <span className="font-mono text-[18px] opacity-50">0{i + 1}</span>
                  {renderIcon(resp.iconName, { size: 30 })}
                </div>

                <div className="my-2">
                  <div className="font-display text-[28px] leading-tight mb-1">
                    {resp.title}
                  </div>
                  <div className="text-[16px] font-body leading-snug opacity-80 line-clamp-4">
                    {resp.description}
                  </div>
                </div>

                <div className="text-[14px] font-mono opacity-50 border-t border-current/15 pt-2">
                  ACTIVE TIER
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </HeroHeader>
  );
}
