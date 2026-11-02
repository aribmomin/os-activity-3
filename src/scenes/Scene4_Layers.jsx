/**
 * Scene 4 — The 6 Layers (centerpiece)
 * Vertical stack that highlights one layer at a time with a detail panel.
 */
import { motion, AnimatePresence } from "framer-motion";
import { layers } from "../data/content";
import LayerCard from "../components/LayerCard";

export default function Scene4_Layers({ step }) {
  // step 0: all layers visible but none highlighted
  // step 1: highlight layer index 1 (Logical FS)
  // step 2: highlight layer index 2 (File-Org)
  // step 3: highlight layer index 3 (Basic FS)
  // step 4: highlight layer index 4 (I/O Control)
  // step 5: highlight layer index 5 (Devices)
  // step 6: all layers lit (full picture)

  // Layers 0 (App) and 5 (Devices) are context layers
  // The detailed ones are indices 1-4 in the data
  const detailIndices = [1, 2, 3, 4, 5];
  const activeIndex =
    step >= 1 && step <= 5 ? detailIndices[step - 1] : null;
  const activeLayer = activeIndex !== null ? layers[activeIndex] : null;
  const allLit = step >= 6;

  return (
    <div className="w-full h-full flex px-16 py-8 gap-10">
      {/* Left: title + layer stack */}
      <div className="flex flex-col gap-4 w-[420px] shrink-0">
        <motion.h2
          className="text-3xl font-bold text-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The <span className="text-accent">6 Layers</span>
        </motion.h2>
        <p className="text-sm text-text-dim -mt-2 mb-2">
          Top → Bottom: from user programs to hardware
        </p>

        <div className="flex flex-col gap-2 flex-1 justify-center">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              <LayerCard
                layer={layer}
                isActive={allLit || i === activeIndex}
              />
            </motion.div>
          ))}
        </div>

        {/* Arrows between layers */}
        <style>{`
          /* tiny connector dots between layers — purely decorative */
        `}</style>
      </div>

      {/* Right: detail panel */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeLayer ? (
            <motion.div
              key={activeLayer.id}
              className="w-full max-w-xl rounded-2xl bg-surface border border-accent/30 p-8 glow-accent flex flex-col gap-5"
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-accent">
                {activeLayer.label}
              </h3>

              <p className="text-sm text-text-muted leading-relaxed">
                {activeLayer.responsibility}
              </p>

              {/* Key terms */}
              <div>
                <p className="text-xs text-text-dim uppercase tracking-widest mb-2 font-semibold">
                  Key Terms
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.keyTerms.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-xs font-mono text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Knows vs Doesn't know */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-bg border border-return/20 p-4">
                  <p className="text-xs text-return font-semibold uppercase tracking-widest mb-1.5">
                    Knows About
                  </p>
                  <p className="text-sm text-text-muted">
                    {activeLayer.knows}
                  </p>
                </div>
                <div className="rounded-xl bg-bg border border-danger/20 p-4">
                  <p className="text-xs text-danger font-semibold uppercase tracking-widest mb-1.5">
                    Doesn't Know
                  </p>
                  <p className="text-sm text-text-muted">
                    {activeLayer.doesntKnow}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : allLit ? (
            <motion.div
              key="all-lit"
              className="w-full max-w-xl rounded-2xl bg-surface border border-accent/20 p-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg text-accent font-semibold text-center">
                All layers work together
              </p>
              <p className="text-sm text-text-muted text-center max-w-md leading-relaxed">
                Each layer has a clear responsibility and communicates only with its
                immediate neighbours — creating a clean, maintainable architecture.
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              className="text-text-dim text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Press → to explore each layer
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
