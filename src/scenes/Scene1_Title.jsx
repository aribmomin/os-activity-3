/**
 * Scene 1 — Title slide
 * Animated grid background, title, subtitle, group member names.
 */
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { groupMembers } from "../data/content";

export default function Scene1_Title({ step }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Floating accent orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        style={{ top: "10%", left: "15%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <Layers className="w-8 h-8 text-accent" />
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-text tracking-tight text-center leading-tight">
          File-System Layers
          <br />
          <span className="text-accent">&amp; Architecture</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-text-muted font-medium">
          Operating Systems — File Management
        </p>

        {/* Divider */}
        <div className="w-24 h-px bg-border mt-2" />

        {/* Group members */}
        {step >= 1 && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {groupMembers.map((name, i) => (
              <motion.span
                key={name}
                className="px-4 py-1.5 rounded-full bg-surface border border-border text-sm text-text-muted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
