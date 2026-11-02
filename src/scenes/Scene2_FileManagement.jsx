/**
 * Scene 2 — What is File Management?
 * User view vs Disk reality with a bridge and 6 responsibilities.
 */
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Image,
  Folder,
  Archive,
  ArrowRightLeft,
} from "lucide-react";
import { sampleFiles, diskBlocks, fmResponsibilities } from "../data/content";

const iconMap = { FileText, Image, Folder, Archive };

export default function Scene2_FileManagement({ step }) {
  // step 0: cards appear
  // step 1-6: responsibilities revealed one at a time
  const visibleResponsibilities = Math.max(0, step); // step 0 = cards only, steps 1-6 = reveal one responsibility each

  return (
    <div className="w-full h-full flex flex-col px-16 py-8 gap-6">
      {/* Section title */}
      <motion.h2
        className="text-3xl font-bold text-text"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        What is <span className="text-accent">File Management</span>?
      </motion.h2>

      {/* Main row: User View — Bridge — Disk Reality */}
      <div className="flex-1 flex items-center gap-8">
        {/* User View Card */}
        <motion.div
          className="flex-1 rounded-2xl bg-surface border border-border p-6 flex flex-col gap-4"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-accent uppercase tracking-widest">
            User View
          </h3>
          <p className="text-xs text-text-dim">
            Files, folders, human-readable names
          </p>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {sampleFiles.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={f.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg border border-border"
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-sm font-mono text-text-muted">
                    {f.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Bridge */}
        <motion.div
          className="flex flex-col items-center gap-3 shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center glow-accent"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ArrowRightLeft className="w-6 h-6 text-accent" />
          </motion.div>
          <span className="text-xs text-accent font-semibold uppercase tracking-widest whitespace-nowrap">
            File Mgmt
          </span>
        </motion.div>

        {/* Disk Reality Card */}
        <motion.div
          className="flex-1 rounded-2xl bg-surface border border-border p-6 flex flex-col gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-text-dim uppercase tracking-widest">
            Disk Reality
          </h3>
          <p className="text-xs text-text-dim">
            Raw numbered blocks on the physical device
          </p>
          <div className="grid grid-cols-6 gap-1.5 mt-1">
            {diskBlocks.map((b) => (
              <div
                key={b}
                className="flex items-center justify-center h-8 rounded-lg bg-bg border border-border"
              >
                <span className="text-[10px] font-mono text-text-dim">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Responsibilities (revealed step by step) */}
      <div className="flex flex-wrap gap-3 mt-auto">
        <AnimatePresence>
          {fmResponsibilities.slice(0, visibleResponsibilities).map((r, i) => (
            <motion.div
              key={r.label}
              className="px-4 py-2 rounded-xl bg-surface border border-border flex flex-col"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <span className="text-sm font-semibold text-accent">
                {r.label}
              </span>
              <span className="text-xs text-text-dim">{r.desc}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
