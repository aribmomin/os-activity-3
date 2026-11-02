/**
 * Scene 8 — Summary / Key Takeaways + Thank you
 */
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircleQuestion } from "lucide-react";
import { summaryBullets } from "../data/content";

export default function Scene8_Summary({ step }) {
  // step 0: bullets appear
  // step 1: "Thank you / Questions?" state
  const showQuestions = step >= 1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16 py-8 gap-8">
      <AnimatePresence mode="wait">
        {!showQuestions ? (
          <motion.div
            key="summary"
            className="flex flex-col items-center gap-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent" />
              <h2 className="text-3xl font-bold text-text">
                Key <span className="text-accent">Takeaways</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {summaryBullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                >
                  <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-sm font-bold text-accent shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed pt-1">
                    {bullet}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <MessageCircleQuestion className="w-9 h-9 text-accent" />
            </motion.div>
            <h2 className="text-4xl font-bold text-text text-center">
              Thank You!
            </h2>
            <p className="text-xl text-accent font-medium">
              Questions?
            </p>
            <div className="w-24 h-px bg-border mt-4" />
            <p className="text-sm text-text-dim">
              File-System Layers &amp; Architecture — Operating Systems
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
