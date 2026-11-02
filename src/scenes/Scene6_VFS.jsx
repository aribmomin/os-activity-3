/**
 * Scene 6 — Virtual File System (VFS)
 * Diagram: App → Syscalls → VFS → file-system implementations.
 * Click an FS to see the route animate.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, HardDrive, MonitorSmartphone, Usb } from "lucide-react";
import { vfsFileSystems } from "../data/content";
import MiniMap from "../components/MiniMap";

const fsIcons = {
  ext4: HardDrive,
  ntfs: MonitorSmartphone,
  fat32: Usb,
  nfs: Globe,
};

export default function Scene6_VFS({ step }) {
  // step 0: show diagram
  // step 1: show VFS interface list
  // step 2: enable FS selection
  // step 3: highlight NFS as network example
  const [selectedFs, setSelectedFs] = useState(null);
  const showInterface = step >= 1;
  const enableSelection = step >= 2;

  /* On step 3, auto-select NFS to demo network FS */
  useEffect(() => {
    if (step === 3 && !selectedFs) setSelectedFs("nfs");
  }, [step]);

  return (
    <div className="w-full h-full flex px-10 py-8 gap-8">
      {/* Mini-map */}
      <div className="flex items-center">
        <MiniMap activeLayerId="logical" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-5">
        <motion.h2
          className="text-3xl font-bold text-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Virtual File System{" "}
          <span className="text-accent">(VFS)</span>
        </motion.h2>
        <p className="text-sm text-text-dim -mt-3">
          One interface, many file-system implementations
        </p>

        {/* Diagram */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          {/* Application */}
          <motion.div
            className="px-8 py-3 rounded-2xl bg-surface border border-border text-sm font-medium text-text-muted"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Application
          </motion.div>

          <div className="w-px h-6 bg-border" />

          {/* System Calls */}
          <motion.div
            className="px-6 py-2 rounded-xl bg-surface border border-border text-xs text-text-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            System Calls: open · read · write · close
          </motion.div>

          <div className="w-px h-6 bg-border" />

          {/* VFS block */}
          <motion.div
            className="px-10 py-4 rounded-2xl bg-accent/10 border border-accent/30 glow-accent flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-base font-bold text-accent">VFS</span>
            <span className="text-xs text-accent/60">Common Interface</span>
            {showInterface && (
              <motion.div
                className="flex gap-2 mt-2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {["open()", "read()", "write()", "close()"].map((fn) => (
                  <span
                    key={fn}
                    className="px-2 py-0.5 rounded bg-accent/10 text-[10px] font-mono text-accent/70"
                  >
                    {fn}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Fan-out lines + FS cards */}
          <div className="flex items-start gap-6 mt-2">
            {vfsFileSystems.map((fs, i) => {
              const Icon = fsIcons[fs.id];
              const isSelected = selectedFs === fs.id;
              return (
                <motion.div
                  key={fs.id}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  {/* Connector */}
                  <motion.div
                    className="w-px h-8"
                    animate={{
                      backgroundColor: isSelected ? "#38BDF8" : "#1F2933",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* FS card */}
                  <motion.button
                    onClick={() => enableSelection && setSelectedFs(fs.id)}
                    className={`
                      flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border
                      transition-colors duration-300
                      ${enableSelection ? "cursor-pointer" : "cursor-default"}
                      ${
                        isSelected
                          ? "bg-accent/10 border-accent/40 glow-accent"
                          : "bg-surface border-border hover:border-accent/20"
                      }
                    `}
                    whileHover={enableSelection ? { scale: 1.03 } : {}}
                    whileTap={enableSelection ? { scale: 0.98 } : {}}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isSelected ? "text-accent" : "text-text-dim"
                      }`}
                    />
                    <span
                      className={`text-sm font-bold ${
                        isSelected ? "text-accent" : "text-text-muted"
                      }`}
                    >
                      {fs.label}
                    </span>
                    <span className="text-[10px] text-text-dim text-center max-w-[120px]">
                      {fs.desc}
                    </span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Selected FS description */}
          <AnimatePresence>
            {selectedFs && (
              <motion.div
                className="mt-3 px-5 py-3 rounded-xl bg-accent/5 border border-accent/20 text-sm text-accent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                VFS routes the request to{" "}
                <span className="font-bold">
                  {vfsFileSystems.find((f) => f.id === selectedFs)?.label}
                </span>{" "}
                implementation
                {selectedFs === "nfs" && " — over the network"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
