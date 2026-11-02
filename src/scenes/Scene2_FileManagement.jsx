/**
 * Scene 2 — What is File Management?
 * User View vs Disk Reality, bridge band, and 6 core responsibilities revealed step-by-step.
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
      <div className="w-full h-full flex flex-col gap-6">
        {/* Split Screen Top Section */}
        <div className="grid grid-cols-2 gap-8 h-[380px] shrink-0">
          {/* Left: User View */}
          <div className="p-8 border-2 border-[#004643]/30 rounded-2xl flex flex-col justify-between bg-[#F0EDE5] card-interactive">
            <div className="flex items-center justify-between">
              <span className="font-display text-[48px]">USER VIEW</span>
              <span className="text-[24px] font-mono uppercase opacity-70">Logical Abstraction</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-[#004643]/20 rounded-xl flex flex-col items-center gap-2">
                <FileText strokeWidth={2} size={48} />
                <span className="font-mono text-[24px] font-semibold">notes.txt</span>
                <span className="text-[24px] opacity-60">5,000 bytes</span>
              </div>
              <div className="p-4 border border-[#004643]/20 rounded-xl flex flex-col items-center gap-2">
                <FileCode strokeWidth={2} size={48} />
                <span className="font-mono text-[24px] font-semibold">report.pdf</span>
                <span className="text-[24px] opacity-60">1.2 MB</span>
              </div>
              <div className="p-4 border border-[#004643]/20 rounded-xl flex flex-col items-center gap-2">
                <Folder strokeWidth={2} size={48} />
                <span className="font-mono text-[24px] font-semibold">/home/docs</span>
                <span className="text-[24px] opacity-60">Directory</span>
              </div>
            </div>
            <div className="text-[28px] font-body opacity-80 border-t border-[#004643]/20 pt-3">
              Abstract, linear, named byte streams with human semantics.
            </div>
          </div>

          {/* Right: Disk Reality */}
          <div className="p-8 border-2 border-[#004643] bg-[#004643] text-[#F0EDE5] rounded-2xl flex flex-col justify-between card-interactive">
            <div className="flex items-center justify-between">
              <span className="font-display text-[48px]">DISK REALITY</span>
              <span className="text-[24px] font-mono uppercase opacity-70">Physical Hardware</span>
            </div>
            <div className="grid grid-cols-4 gap-3 font-mono text-[24px] text-center">
              <div className="p-2 border border-[#F0EDE5]/40 rounded">[Blk 0104]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/20 font-bold">[Blk 8812]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded">[Blk 4096]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded">[Blk 0019]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded">[Blk 5120]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded">[Blk 7731]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded bg-[#F0EDE5]/20 font-bold">[Blk 8813]</div>
              <div className="p-2 border border-[#F0EDE5]/40 rounded">[Blk 9002]</div>
            </div>
            <div className="text-[28px] font-body opacity-80 border-t border-[#F0EDE5]/20 pt-3">
              Unordered, raw 4KB blocks across platters and flash cells.
            </div>
          </div>
        </div>

        {/* Center File Management Bridge Band */}
        <div className="w-full py-2 px-6 border-y-2 border-current flex items-center justify-between bg-current/5">
          <span className="font-display text-[36px] tracking-wider">
            FILE MANAGEMENT SYSTEM BRIDGE
          </span>
          <span className="font-mono text-[24px] opacity-70">
            TRANSLATES SYMBOLIC OPERATIONS INTO SECTOR COMMANDS
          </span>
        </div>

        {/* Six Responsibilities revealed per step */}
        <div className="grid grid-cols-6 gap-4 flex-1">
          {fileManagementResponsibilities.map((resp, i) => {
            const isRevealed = i < visibleResponsibilities;
            return (
              <motion.div
                key={resp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isRevealed ? 1 : 0.25,
                  y: isRevealed ? 0 : 10
                }}
                transition={springTransition}
                className={`p-5 rounded-xl border-2 border-[#004643]/30 flex flex-col justify-between card-interactive ${
                  isRevealed ? "bg-[#004643]/5" : "opacity-30"
                }`}
                data-clickable
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[24px] opacity-50">0{i + 1}</span>
                  {renderIcon(resp.iconName, { size: 40 })}
                </div>
                <div className="font-display text-[40px] leading-none my-2">
                  {resp.title}
                </div>
                <div className="text-[24px] font-body leading-snug opacity-80">
                  {resp.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </HeroHeader>
  );
}
