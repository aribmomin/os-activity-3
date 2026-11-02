/**
 * Shared LayerCard — renders a single layer in the stack.
 * Used by Scene 4 (The 6 Layers) and the mini-map in Scenes 5-6.
 */
import { motion } from "framer-motion";

export default function LayerCard({
  layer,
  isActive = false,
  isMini = false,
  highlightColor = null,
  onClick,
  className = "",
}) {
  const height = isMini ? "h-7" : "h-12";
  const textSize = isMini ? "text-[10px]" : "text-sm";
  const borderColor = isActive
    ? highlightColor || "border-accent"
    : "border-border";

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`
        relative flex items-center justify-center
        ${height} rounded-lg border
        ${borderColor}
        ${isActive ? "glow-accent bg-accent/5" : "bg-surface"}
        ${onClick ? "cursor-pointer" : ""}
        transition-colors duration-300
        ${className}
      `}
      animate={{
        borderColor: isActive ? (highlightColor === "border-return" ? "#34D399" : "#38BDF8") : "#1F2933",
        backgroundColor: isActive ? "rgba(56,189,248,0.05)" : "rgba(18,24,33,1)",
      }}
      transition={{ duration: 0.3 }}
    >
      <span className={`${textSize} font-medium ${isActive ? "text-accent" : "text-text-muted"}`}>
        {isMini ? layer.short : layer.label}
      </span>

      {/* Active pulse dot */}
      {isActive && !isMini && (
        <motion.div
          className="absolute left-3 w-2 h-2 rounded-full bg-accent"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.div>
  );
}
