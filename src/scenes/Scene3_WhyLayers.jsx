/**
 * Scene 3 — Why Layers?
 * Monolithic vs Layered visualization with benefit/cost chips.
 */
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { layerBenefits, layerCosts } from "../data/content";

export default function Scene3_WhyLayers({ step }) {
  // step 0: monolithic block
  // step 1: transition to layered
  // step 2: benefit chips appear
  // step 3: cost chip appears
  const showLayered = step >= 1;
  const showBenefits = step >= 2;
  const showCosts = step >= 3;

  const monolithicLayers = [
    "Naming", "Allocation", "I/O", "Caching", "Drivers", "Hardware",
  ];

  const cleanLayers = [
    "Application Programs",
    "Logical File System",
    "File-Organization Module",
    "Basic File System",
    "I/O Control",
    "Devices",
  ];

  return (
    <div className="w-full h-full flex flex-col px-16 py-8 gap-6">
      <motion.h2
        className="text-3xl font-bold text-text"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Why <span className="text-accent">Layers</span>?
      </motion.h2>

      <div className="flex-1 flex items-center justify-center gap-16">
        {/* Monolithic block */}
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ opacity: showLayered ? 0.35 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Boxes className="w-5 h-5 text-danger" />
            <span className="text-sm font-semibold text-danger uppercase tracking-widest">
              Monolithic
            </span>
          </div>
          <div className="relative w-64 rounded-2xl bg-surface border border-danger/30 p-5 flex flex-wrap gap-2 justify-center">
            {monolithicLayers.map((l) => (
              <span
                key={l}
                className="px-2.5 py-1 rounded-lg bg-danger/10 border border-danger/20 text-xs font-mono text-danger/80"
              >
                {l}
              </span>
            ))}
            {/* Tangled lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="#F87171" strokeWidth="1" />
              <line x1="70%" y1="25%" x2="30%" y2="75%" stroke="#F87171" strokeWidth="1" />
              <line x1="15%" y1="60%" x2="85%" y2="40%" stroke="#F87171" strokeWidth="1" />
            </svg>
          </div>
          <span className="text-xs text-text-dim mt-1">
            Everything tangled together
          </span>
        </motion.div>

        {/* Arrow */}
        <AnimatePresence>
          {showLayered && (
            <motion.div
              className="text-accent"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                <path d="M0 12h40m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layered stack */}
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ opacity: showLayered ? 1 : 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              Layered
            </span>
          </div>
          <div className="flex flex-col gap-1.5 w-72">
            {cleanLayers.map((l, i) => (
              <motion.div
                key={l}
                className="px-4 py-2.5 rounded-xl bg-surface border border-accent/20 text-center"
                initial={showLayered ? { opacity: 0, x: 30 } : {}}
                animate={showLayered ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <span className="text-xs font-medium text-accent/80">
                  {l}
                </span>
              </motion.div>
            ))}
          </div>
          <span className="text-xs text-text-dim mt-1">
            Clean separation of concerns
          </span>
        </motion.div>
      </div>

      {/* Benefit & cost chips */}
      <div className="flex gap-3 mt-auto flex-wrap">
        <AnimatePresence>
          {showBenefits &&
            layerBenefits.map((b, i) => (
              <motion.div
                key={b.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-return/20"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
              >
                <CheckCircle2 className="w-4 h-4 text-return" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-return">
                    {b.label}
                  </span>
                  <span className="text-xs text-text-dim">{b.desc}</span>
                </div>
              </motion.div>
            ))}
          {showCosts &&
            layerCosts.map((c) => (
              <motion.div
                key={c.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-danger/20"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <AlertTriangle className="w-4 h-4 text-danger" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-danger">
                    {c.label}
                  </span>
                  <span className="text-xs text-text-dim">{c.desc}</span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
