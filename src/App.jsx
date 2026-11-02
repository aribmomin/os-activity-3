/**
 * App.jsx — Master Presentation Shell
 *
 * Implements:
 * - 16:9 fixed canvas (1920x1080) with automatic proportional scaling
 * - Strictly Bicolor dynamic theming: alternating #004643 Green and #F0EDE5 Cream
 * - Custom smooth round magnetic cursor consistent across every page with zero re-render lag
 * - Keyboard navigation (Space/Arrows, 1-8 jump, T timer, F fullscreen, H hide UI)
 * - Sound effects (soft procedural Web Audio API clicks with mute toggle)
 * - Top information bar (topic, part, presenter, timer, quick controls)
 * - Bottom progress bar (8 clickable scene blocks, step counter, navigation controls)
 * - Auto-dismissing shortcuts guide toast
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  X
} from "lucide-react";

import { scenesMeta, presenters } from "./data.js";
import {
  Scene1_Title,
  Scene2_FileManagement,
  Scene3_WhyLayers,
  Scene4_Layers,
  Scene5_LiveTrace,
  Scene6_VFS,
  Scene7_ProsCons,
  Scene8_Summary
} from "./scenes/index.js";
import CustomCursor from "./components/CustomCursor.jsx";

const sceneComponents = [
  Scene1_Title,
  Scene2_FileManagement,
  Scene3_WhyLayers,
  Scene4_Layers,
  Scene5_LiveTrace,
  Scene6_VFS,
  Scene7_ProsCons,
  Scene8_Summary
];

const CANVAS_W = 1920;
const CANVAS_H = 1080;

/* ── Procedural Web Audio Synth for Subtle Feedback ──────────────────────── */
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playStep() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio catch
    }
  }

  playScene() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {
      // Audio catch
    }
  }
}

const sfx = new SoundFX();

export default function App() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [scale, setScale] = useState(1);
  const [hideUI, setHideUI] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [showToast, setShowToast] = useState(true);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const currentScene = scenesMeta[sceneIdx];
  const CurrentComponent = sceneComponents[sceneIdx];
  const currentTheme = currentScene?.theme || "green";
  const isGreen = currentTheme === "green";
  const themeClass = isGreen ? "theme-green" : "theme-cream";

  /* ── Proportional 16:9 Canvas Scaling ──────────────────────────────────── */
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nextScale = Math.min(vw / CANVAS_W, vh / CANVAS_H);
      setScale(nextScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Presenter Timer ───────────────────────────────────────────────────── */
  useEffect(() => {
    if (showTimer) {
      timerRef.current = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showTimer]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  /* ── Fullscreen Sync ───────────────────────────────────────────────────── */
  useEffect(() => {
    const onFSChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFSChange);
    return () => document.removeEventListener("fullscreenchange", onFSChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  /* ── Sound Toggle ──────────────────────────────────────────────────────── */
  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      sfx.enabled = next;
      return next;
    });
  }, []);

  /* ── Auto-dismiss Help Toast ───────────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setShowToast(false), 7000);
    return () => clearTimeout(t);
  }, []);

  /* ── Navigation Handlers ───────────────────────────────────────────────── */
  const goNext = useCallback(() => {
    if (step < currentScene.totalSteps - 1) {
      setStep((s) => s + 1);
      sfx.playStep();
    } else if (sceneIdx < scenesMeta.length - 1) {
      setSceneIdx((i) => i + 1);
      setStep(0);
      sfx.playScene();
    }
  }, [step, currentScene.totalSteps, sceneIdx]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
      sfx.playStep();
    } else if (sceneIdx > 0) {
      const prevScene = scenesMeta[sceneIdx - 1];
      setSceneIdx((i) => i - 1);
      setStep(prevScene.totalSteps - 1);
      sfx.playScene();
    }
  }, [step, sceneIdx]);

  const jumpToScene = useCallback(
    (idx) => {
      if (idx >= 0 && idx < scenesMeta.length && idx !== sceneIdx) {
        setSceneIdx(idx);
        setStep(0);
        sfx.playScene();
      }
    },
    [sceneIdx]
  );

  const handleRestart = useCallback(() => {
    setSceneIdx(0);
    setStep(0);
    sfx.playScene();
  }, []);

  /* ── Keyboard Shortcuts ────────────────────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
        case "Enter":
          e.preventDefault();
          goNext();
          break;

        case "ArrowLeft":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          goPrev();
          break;

        case "h":
        case "H":
          e.preventDefault();
          setHideUI((prev) => !prev);
          break;

        case "t":
        case "T":
          e.preventDefault();
          setShowTimer((prev) => !prev);
          break;

        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;

        case "m":
        case "M":
          e.preventDefault();
          toggleSound();
          break;

        case "Home":
          e.preventDefault();
          handleRestart();
          break;

        case "End":
          e.preventDefault();
          jumpToScene(scenesMeta.length - 1);
          break;

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          e.preventDefault();
          jumpToScene(Number(e.key) - 1);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, jumpToScene, handleRestart, toggleFullscreen, toggleSound]);

  /* ── Global Step Progress ──────────────────────────────────────────────── */
  const totalGlobalSteps = scenesMeta.reduce((acc, s) => acc + s.totalSteps, 0);
  const completedSteps =
    scenesMeta.slice(0, sceneIdx).reduce((acc, s) => acc + s.totalSteps, 0) + step;
  const progressRatio = completedSteps / (totalGlobalSteps - 1);

  return (
    <div
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden flex items-center justify-center select-none transition-colors duration-500 ${
        isGreen ? "bg-[#004643]" : "bg-[#F0EDE5]"
      }`}
    >
      {/* ── Custom Smooth Round Magnetic Cursor (Zero Lag) ───────────────── */}
      <CustomCursor theme={currentTheme} />

      {/* ── 16:9 Scaled Canvas (1920x1080) ───────────────────────────────── */}
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center"
        }}
        className={`relative ${themeClass} overflow-hidden shrink-0 flex flex-col justify-between px-10 py-5`}
      >
        {/* ── Top Information Bar ────────────────────────────────────────── */}
        <AnimatePresence>
          {!hideUI && (
            <motion.header
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-between border-b border-current/20 pb-2.5 shrink-0 z-30"
            >
              {/* Left breadcrumb */}
              <div className="flex items-center gap-3">
                <span className="font-display text-[22px] tracking-wider uppercase">
                  OPERATING SYSTEMS
                </span>
                <span className="opacity-30">•</span>
                <span className="font-mono text-[17px] opacity-70">
                  SCENE 0{currentScene.id} / 0{scenesMeta.length} — {currentScene.title}
                </span>
              </div>

              {/* Right presenter and quick toggles */}
              <div className="flex items-center gap-4">
                {/* Timer badge */}
                {showTimer && (
                  <div className="flex items-center gap-2 px-3.5 py-1 border border-current rounded-full font-mono text-[17px]">
                    <Timer size={18} strokeWidth={2} />
                    <span>{formatTime(elapsed)}</span>
                  </div>
                )}

                {/* Presenter Pill */}
                <div className="font-display text-[18px] px-4 py-1 border border-current rounded-full tracking-wide">
                  {presenters[currentScene.part]}
                </div>

                {/* Control Action Icons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleSound}
                    title={soundOn ? "Mute audio (M)" : "Enable audio (M)"}
                    className="p-1.5 border border-current/30 rounded-lg hover:bg-current hover:text-[var(--bg)] transition-colors"
                    data-clickable
                  >
                    {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>

                  <button
                    onClick={() => setShowTimer((v) => !v)}
                    title="Toggle timer (T)"
                    className={`p-1.5 border border-current/30 rounded-lg hover:bg-current hover:text-[var(--bg)] transition-colors ${
                      showTimer ? "bg-current text-[var(--bg)]" : ""
                    }`}
                    data-clickable
                  >
                    <Timer size={20} />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    title="Toggle fullscreen (F)"
                    className="p-1.5 border border-current/30 rounded-lg hover:bg-current hover:text-[var(--bg)] transition-colors"
                    data-clickable
                  >
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>

                  <button
                    onClick={() => setHideUI(true)}
                    title="Hide UI chrome (H)"
                    className="p-1.5 border border-current/30 rounded-lg hover:bg-current hover:text-[var(--bg)] transition-colors"
                    data-clickable
                  >
                    <EyeOff size={20} />
                  </button>
                </div>
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* ── Unhide floating button when hideUI is active ────────────────── */}
        {hideUI && (
          <button
            onClick={() => setHideUI(false)}
            title="Restore UI (H)"
            className="absolute top-5 right-5 z-40 p-2.5 rounded-full border border-current bg-current/10 hover:bg-current hover:text-[var(--bg)] transition-colors"
            data-clickable
          >
            <Eye size={22} />
          </button>
        )}

        {/* ── Main Scene Canvas (Optimized height without cutting) ───────── */}
        <main className="flex-1 w-full min-h-0 relative my-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={sceneIdx}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full h-full"
            >
              <CurrentComponent
                meta={currentScene}
                step={step}
                onRestart={handleRestart}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── Bottom Navigation & Progress Bar ────────────────────────────── */}
        <AnimatePresence>
          {!hideUI && (
            <motion.footer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col gap-2 pt-2.5 border-t border-current/20 shrink-0 z-30"
            >
              {/* Continuous Global Progress Line */}
              <div className="w-full h-1.5 bg-current/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-current rounded-full"
                  initial={false}
                  animate={{ width: `${progressRatio * 100}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>

              {/* Controls and Scene Jump Buttons */}
              <div className="w-full flex items-center justify-between">
                {/* 8 Clickable Scene Buttons */}
                <div className="flex items-center gap-1.5">
                  {scenesMeta.map((s, idx) => {
                    const isCurrent = idx === sceneIdx;
                    const isPast = idx < sceneIdx;
                    return (
                      <button
                        key={s.id}
                        onClick={() => jumpToScene(idx)}
                        className={`px-3 py-1 rounded-lg border font-mono text-[16px] transition-all ${
                          isCurrent
                            ? "border-current bg-current text-[var(--bg)] font-bold shadow-sm"
                            : isPast
                            ? "border-current/40 bg-current/10 hover:border-current"
                            : "border-current/20 opacity-50 hover:opacity-90 hover:border-current/50"
                        }`}
                        title={`Scene ${s.id}: ${s.title}`}
                        data-clickable
                      >
                        0{s.id}
                      </button>
                    );
                  })}
                </div>

                {/* Step Sub-Progress */}
                <div className="font-mono text-[17px] tracking-wide">
                  <span className="opacity-50">STEP </span>
                  <span className="font-bold">{step + 1}</span>
                  <span className="opacity-50"> / {currentScene.totalSteps}</span>
                </div>

                {/* Next / Prev Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={goPrev}
                    disabled={sceneIdx === 0 && step === 0}
                    className="flex items-center gap-1.5 px-4 py-1.5 border border-current rounded-xl hover:bg-current hover:text-[var(--bg)] disabled:opacity-30 disabled:pointer-events-none transition-colors font-display text-[18px]"
                    data-clickable
                  >
                    <ChevronLeft size={20} />
                    <span>PREV</span>
                  </button>

                  <button
                    onClick={goNext}
                    disabled={
                      sceneIdx === scenesMeta.length - 1 &&
                      step === currentScene.totalSteps - 1
                    }
                    className="flex items-center gap-1.5 px-5 py-1.5 border-2 border-current rounded-xl bg-current text-[var(--bg)] hover:opacity-90 disabled:opacity-30 disabled:pointer-events-none transition-opacity font-display text-[18px]"
                    data-clickable
                  >
                    <span>NEXT</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.footer>
          )}
        </AnimatePresence>

        {/* ── First-Load Keyboard Shortcut Hint Toast ────────────────────── */}
        <AnimatePresence>
          {showToast && !hideUI && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 rounded-xl border-2 border-current bg-[var(--bg)] text-[var(--fg)] shadow-2xl flex items-center gap-5 font-mono text-[16px]"
            >
              <div className="flex items-center gap-2">
                <HelpCircle size={20} />
                <span className="font-bold">SHORTCUTS:</span>
              </div>
              <span>
                <kbd className="px-1.5 py-0.5 border border-current rounded font-bold">SPACE</kbd> /{" "}
                <kbd className="px-1.5 py-0.5 border border-current rounded font-bold">→</kbd> Next
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 border border-current rounded font-bold">←</kbd> Prev
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 border border-current rounded font-bold">1-8</kbd> Jump
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 border border-current rounded font-bold">T</kbd> Timer
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 border border-current rounded font-bold">F</kbd> Fullscreen
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 border border-current rounded font-bold">H</kbd> Hide UI
              </span>

              <button
                onClick={() => setShowToast(false)}
                className="p-1 hover:opacity-70 transition-opacity ml-1"
                data-clickable
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
