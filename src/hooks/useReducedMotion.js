import { useState, useEffect } from "react";

/**
 * Detects user preference for reduced motion and low-end devices.
 * Use to disable heavy 3D or animations for accessibility and performance.
 */
export function useReducedMotion() {
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPreferReducedMotion(mediaQuery.matches);
    const handler = (e) => setPreferReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Heuristic: few cores or small memory suggests low-end device
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    setIsLowEnd(cores <= 2 || memory <= 2);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const disable3D = preferReducedMotion || isLowEnd;
  return { preferReducedMotion, isLowEnd, disable3D };
}
