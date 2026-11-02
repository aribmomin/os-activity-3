import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — High performance, hardware-accelerated smooth round cursor.
 * Uses requestAnimationFrame and direct DOM transforms to avoid React re-render lag.
 * Perfectly round inner dot + smooth trailing ring that expands on interactive hover.
 * Dynamically contrasts with the active scene theme on every page.
 */
export default function CustomCursor({ theme = "green" }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Instant inner dot placement (zero lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check hover on interactive targets
      const target = e.target;
      const clickable = Boolean(
        target &&
          (target.closest("[data-clickable]") ||
            target.closest("button") ||
            target.closest("a") ||
            target.closest(".card-interactive"))
      );
      setIsHovered(clickable);
    };

    // Smooth spring interpolation for the outer round ring
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animateRing);
    };

    animId = requestAnimationFrame(animateRing);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  const isGreenTheme = theme === "green";
  const dotColor = isGreenTheme ? "#F0EDE5" : "#004643";
  const ringBorderColor = isGreenTheme
    ? "rgba(240, 237, 229, 0.7)"
    : "rgba(0, 70, 67, 0.7)";
  const ringBgColor = isGreenTheme
    ? isHovered ? "rgba(240, 237, 229, 0.15)" : "transparent"
    : isHovered ? "rgba(0, 70, 67, 0.15)" : "transparent";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-200"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Smooth outer round ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          width: isHovered ? 52 : 32,
          height: isHovered ? 52 : 32,
          border: `2px solid ${ringBorderColor}`,
          backgroundColor: ringBgColor,
          transition:
            "width 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s ease-out, border-color 0.2s ease-out"
        }}
      />

      {/* Smooth solid inner round dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          width: isHovered ? 6 : 10,
          height: isHovered ? 6 : 10,
          backgroundColor: dotColor,
          transition:
            "width 0.15s ease-out, height 0.15s ease-out, background-color 0.2s ease-out"
        }}
      />
    </div>
  );
}

