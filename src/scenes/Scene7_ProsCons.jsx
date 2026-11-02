/**
 * Scene 7 — Pros & Cons
 * Two-column minimal comparison with icons.
 */
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Puzzle,
  Repeat2,
  Bug,
  Globe,
  Clock,
  Zap,
  PenTool,
} from "lucide-react";
import { prosItems, consItems } from "../data/content";

const proIcons = [Puzzle, Repeat2, Bug, Globe];
const conIcons = [Clock, Zap, PenTool];

export default function Scene7_ProsCons({ step }) {
  // step 0: title
  // step 1: pros appear
  // step 2: cons appear
  const showPros = step >= 1;
  const showCons = step >= 2;

  return (
    <div className="w-full h-full flex flex-col px-16 py-8 gap-6">
      <motion.h2
        className="text-3xl font-bold text-text"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Pros <span className="text-text-dim">&</span>{" "}
        <span className="text-accent">Cons</span>
      </motion.h2>

      <div className="flex-1 flex gap-10 items-start mt-4">
        {/* Pros column */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-return" />
            <span className="text-sm font-semibold text-return uppercase tracking-widest">
              Advantages
            </span>
          </div>
          <AnimatePresence>
            {showPros &&
              prosItems.map((item, i) => {
                const Icon = proIcons[i];
                return (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-return/15"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-return/10 border border-return/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-return" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-return">
                        {item.title}
                      </h4>
                      <p className="text-sm text-text-muted mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px bg-border self-stretch" />

        {/* Cons column */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-danger" />
            <span className="text-sm font-semibold text-danger uppercase tracking-widest">
              Disadvantages
            </span>
          </div>
          <AnimatePresence>
            {showCons &&
              consItems.map((item, i) => {
                const Icon = conIcons[i];
                return (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-danger/15"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-danger" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-danger">
                        {item.title}
                      </h4>
                      <p className="text-sm text-text-muted mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
