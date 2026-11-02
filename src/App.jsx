/**
 * App.jsx — Root presentation shell
 *
 * Handles:
 * - 16:9 fixed canvas that scales to fit the window
 * - Scene/step navigation via keyboard
 * - Top bar (title, progress, presenter)
 * - Bottom progress bar + scene counter
 * - Timer (toggle T), hide mode (H), jump (1-8)
 * - Keyboard-hint toast on first load
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Eye, EyeOff } from "lucide-react";
import { scenes, presenters } from "./data/content";

/* ── Scene components ───────────────────────────────────────── */
import Scene1_Title from "./scenes/Scene1_Title";
import Scene2_FileManagement from "./scenes/Scene2_FileManagement";
import Scene3_WhyLayers from "./scenes/Scene3_WhyLayers";
import Scene4_Layers from "./scenes/Scene4_Layers";
import Scene5_LiveTrace from "./scenes/Scene5_LiveTrace";
import Scene6_VFS from "./scenes/Scene6_VFS";
import Scene7_ProsCons from "./scenes/Scene7_ProsCons";
import Scene8_Summary from "./scenes/Scene8_Summary";

const sceneComponents = [
  Scene1_Title,
  Scene2_FileManagement,
  Scene3_WhyLayers,
  Scene4_Layers,
  Scene5_LiveTrace,
  Scene6_VFS,
  Scene7_ProsCons,
  Scene8_Summary,
];

/* ── Constants ──────────────────────────────────────────────── */
const CANVAS_W = 1920;
const CANVAS_H = 1080;

export default function App() {
  const [sceneIdx, setSceneIdx] = useState(0); // 0-indexed
  const [step, setStep] = useState(0);
  const [hideUI, setHideUI] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showToast, setShowToast] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const currentScene = scenes[sceneIdx];
  const totalSteps = currentScene.steps;
  const CurrentComponent = sceneComponents[sceneIdx];

  /* ── Responsive scaling ─────────────────────────────────── */
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setScale(Math.min(vw / CANVAS_W, vh / CANVAS_H));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Timer ──────────────────────────────────────────────── */
  useEffect(() => {
    if (showTimer) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [showTimer]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ── Auto-dismiss toast ─────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(t);
  }, []);

  /* ── Navigation ─────────────────────────────────────────── */
  const goNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else if (sceneIdx < scenes.length - 1) {
      setSceneIdx((i) => i + 1);
      setStep(0);
    }
  }, [step, totalSteps, sceneIdx]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else if (sceneIdx > 0) {
      setSceneIdx((i) => i - 1);
      const prevSteps = scenes[sceneIdx - 1].steps;
      setStep(prevSteps - 1);
    }
  }, [step, sceneIdx]);

  const jumpToScene = useCallback((idx) => {
    if (idx >= 0 && idx < scenes.length) {
      setSceneIdx(idx);
      setStep(0);
    }
  }, []);

  /* ── Keyboard handler ───────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "h":
        case "H":
          setHideUI((v) => !v);
          break;
        case "t":
        case "T":
          setShowTimer((v) => !v);
          break;
        case "1": case "2": case "3": case "4":
        case "5": case "6": case "7": case "8":
          jumpToScene(Number(e.key) - 1);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, jumpToScene]);

  /* ── Global progress (across all scenes/steps) ──────────── */
  const totalGlobalSteps = scenes.reduce((acc, s) => acc + s.steps, 0);
  const completedSteps =
    scenes.slice(0, sceneIdx).reduce((acc, s) => acc + s.steps, 0) + step;
  const progressPct = (completedSteps / (totalGlobalSteps - 1)) * 100;

  return (
    <div
      className={`w-screen h-screen bg-bg flex items-center justify-center overflow-hidden ${
        hideUI ? "cursor-hidden" : ""
      }`}
      ref={containerRef}
    >
      {/* Scaled 16:9 canvas */}
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="relative bg-bg overflow-hidden shrink-0"
      >
        {/* ── Top bar ─────────────────────────────────────── */}
        <AnimatePresence>
          {!hideUI && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6 z-30 bg-bg/80 backdrop-blur-sm border-b border-border"
              initial={{ y: -44 }}
              animate={{ y: 0 }}
              exit={{ y: -44 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-medium text-text-dim tracking-wide">
                File-System Layers & Architecture
              </span>
              <div className="flex items-center gap-4">
                {showTimer && (
                  <motion.div
                    className="flex items-center gap-1.5 text-xs text-text-dim"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span className="font-mono">{formatTime(elapsed)}</span>
                  </motion.div>
                )}
                <span className="text-xs text-accent font-medium">
                  Part {currentScene.part} — {presenters[currentScene.part]}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scene content ────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIdx}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CurrentComponent step={step} />
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <AnimatePresence>
          {!hideUI && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-30 flex flex-col"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress bar */}
              <div className="progress-track mx-6">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {/* Scene counter */}
              <div className="flex items-center justify-between px-6 py-2">
                <div className="flex gap-1">
                  {scenes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => jumpToScene(i)}
                      className={`w-6 h-1.5 rounded-full transition-colors duration-300 ${
                        i === sceneIdx
                          ? "bg-accent"
                          : i < sceneIdx
                          ? "bg-accent/30"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-text-dim">
                  {sceneIdx + 1}/{scenes.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Keyboard toast ───────────────────────────────── */}
        <AnimatePresence>
          {showToast && !hideUI && (
            <motion.div
              className="absolute bottom-14 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-xl bg-surface border border-border backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-4 text-xs text-text-dim">
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border font-mono text-text-muted">→</kbd>{" "}
                  next
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border font-mono text-text-muted">←</kbd>{" "}
                  prev
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border font-mono text-text-muted">H</kbd>{" "}
                  hide UI
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border font-mono text-text-muted">T</kbd>{" "}
                  timer
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border font-mono text-text-muted">1-8</kbd>{" "}
                  jump
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
