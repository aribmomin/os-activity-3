/**
 * Scene 5 — Live Trace: read("notes.txt", byte 5000)
 * Animated packet traveling down (accent) then up (green) through layers.
 */
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowDown, ArrowUp } from "lucide-react";
import { traceSteps } from "../data/content";
import MiniMap from "../components/MiniMap";

export default function Scene5_LiveTrace({ step }) {
  // step 0: intro (show the call)
  // step 1-5: going down (traceSteps 0-4)
  // step 6-8: coming up (traceSteps 5-7)
  const traceIdx = step - 1; // -1 means intro
  const currentTrace = traceSteps[traceIdx] ?? null;
  const direction = currentTrace?.direction ?? "down";
  const isIntro = step === 0;

  return (
    <div className="w-full h-full flex px-10 py-8 gap-8">
      {/* Mini-map */}
      <div className="flex items-center">
        <MiniMap
          activeLayerId={currentTrace?.layerId}
          direction={direction}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Title + call */}
        <div>
          <motion.h2
            className="text-3xl font-bold text-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Live Trace:{" "}
            <span className="font-mono text-accent">
              read("notes.txt", 5000)
            </span>
          </motion.h2>
          <p className="text-sm text-text-dim mt-1">
            Follow a read request through every layer
          </p>
        </div>

        {/* Center: trace visualization */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isIntro ? (
              <motion.div
                key="intro"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-accent" />
                </div>
                <p className="text-text-muted text-center max-w-md">
                  A user application calls{" "}
                  <code className="font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                    read("notes.txt", byte 5000)
                  </code>
                  . Press → to trace the request through each layer.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={traceIdx}
                className="w-full max-w-2xl flex flex-col gap-5"
                initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Direction indicator */}
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      direction === "down"
                        ? "bg-accent/10 border border-accent/20"
                        : "bg-return/10 border border-return/20"
                    }`}
                    animate={{ y: direction === "down" ? [0, 4, 0] : [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    {direction === "down" ? (
                      <ArrowDown className="w-5 h-5 text-accent" />
                    ) : (
                      <ArrowUp className="w-5 h-5 text-return" />
                    )}
                  </motion.div>
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        direction === "down" ? "text-accent" : "text-return"
                      }`}
                    >
                      {currentTrace.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-0.5">
                      {currentTrace.caption}
                    </p>
                  </div>
                </div>

                {/* Detail box */}
                <motion.div
                  className={`rounded-2xl p-5 border font-mono text-sm leading-relaxed whitespace-pre-wrap ${
                    direction === "down"
                      ? "bg-accent/5 border-accent/20 text-accent"
                      : "bg-return/5 border-return/20 text-return"
                  }`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  {currentTrace.detail}
                </motion.div>

                {/* Progress dots */}
                <div className="flex items-center gap-2 justify-center mt-2">
                  {traceSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        i < traceIdx
                          ? traceSteps[i].direction === "down"
                            ? "bg-accent"
                            : "bg-return"
                          : i === traceIdx
                          ? direction === "down"
                            ? "bg-accent glow-accent"
                            : "bg-return glow-return"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
