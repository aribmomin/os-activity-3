/**
 * Scene 6 — Virtual File System (VFS)
 * Polymorphic interface decoupling POSIX system calls from filesystem-specific disk structures.
 * Strictly Bicolor (#004643 & #F0EDE5) with interactive filesystem selection.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { vfsData } from "../data.js";

export default function Scene6_VFS({ meta, step }) {
  const fsKeys = ["ext4", "ntfs", "fat32", "nfs"];
  const [clickedFS, setClickedFS] = useState(null);
  const [prevStep, setPrevStep] = useState(step);

  if (prevStep !== step) {
    setPrevStep(step);
    setClickedFS(null);
  }

  const selectedFS = clickedFS || fsKeys[Math.min(Math.max(0, step - 1), 3)];

  return (
    <HeroHeader meta={meta} step={step}>
      <div className="w-full h-full flex flex-col justify-between gap-6">
        {/* Top: Application Programs Tier */}
        <div className="w-full p-6 border-2 border-[#004643] rounded-2xl flex items-center justify-between bg-[#F0EDE5] card-interactive">
          <div className="flex items-center gap-6">
            <Terminal strokeWidth={2} size={54} />
            <div className="flex flex-col">
              <span className="font-display text-[48px]">APPLICATION PROGRAMS</span>
              <span className="text-[26px] font-body opacity-80">
                User processes issue uniform POSIX API calls: open(), read(), write(), close()
              </span>
            </div>
          </div>
          <span className="font-mono text-[26px] font-bold px-6 py-2 border border-[#004643] rounded-full">
            UNIFORM SYSTEM CALLS
          </span>
        </div>

        {/* Middle: Wide VFS Band */}
        <div className="w-full p-8 border-2 border-[#004643] bg-[#004643] text-[#F0EDE5] rounded-2xl flex flex-col gap-4 card-interactive">
          <div className="flex items-center justify-between border-b border-[#F0EDE5]/20 pb-3">
            <span className="font-display text-[56px] leading-none">
              VIRTUAL FILE SYSTEM (VFS) INTERFACE
            </span>
            <span className="font-mono text-[26px] opacity-70">
              POLYMORPHISM LAYER
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[28px] font-body max-w-3xl opacity-90">
              Decouples standard POSIX system calls from filesystem-specific disk structures through the{" "}
              <code className="font-mono font-bold">vnode</code> abstraction.
            </div>

            <div className="flex items-center gap-3 font-mono text-[24px]">
              {vfsData.operations.map((op) => (
                <span key={op} className="px-4 py-1.5 border border-[#F0EDE5]/40 rounded-full">
                  {op}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Route Line */}
        <div className="flex items-center justify-center gap-4 py-1">
          <div className="h-0.5 flex-1 bg-[#004643]/30" />
          <span className="font-mono text-[24px] uppercase px-4 py-1 border border-[#004643]/40 rounded-full">
            ROUTING REQUEST TO: <strong className="font-bold">{selectedFS.toUpperCase()}</strong>
          </span>
          <div className="h-0.5 flex-1 bg-[#004643]/30" />
        </div>

        {/* Bottom: 4 Large Filesystem Cards */}
        <div className="grid grid-cols-4 gap-6 flex-1 min-h-0">
          {vfsData.filesystems.map((fs) => {
            const isSelected = selectedFS === fs.id;
            return (
              <motion.div
                key={fs.id}
                layout
                onClick={() => setClickedFS(fs.id)}
                className={`p-6 rounded-2xl border-2 border-[#004643] flex flex-col justify-between cursor-pointer transition-colors duration-200 ${
                  isSelected
                    ? "bg-[#004643] text-[#F0EDE5]"
                    : "bg-[#F0EDE5] text-[#004643] hover:bg-[#004643]/10"
                }`}
                data-clickable
              >
                <div className="flex items-center justify-between border-b border-current/20 pb-3">
                  <span className="font-display text-[56px] leading-none uppercase">
                    {fs.name}
                  </span>
                  <span className="font-mono text-[24px] uppercase opacity-70">
                    {fs.type}
                  </span>
                </div>

                <div className="text-[26px] font-body leading-snug py-2">
                  {fs.desc}
                </div>

                <div className="pt-3 border-t border-current/20 font-mono text-[24px] opacity-80">
                  {fs.features}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </HeroHeader>
  );
}
