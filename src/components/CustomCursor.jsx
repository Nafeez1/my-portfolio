import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Custom cursor that follows the mouse. Hidden on touch devices.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    document.body.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      document.body.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ x: pos.x, y: pos.y, opacity: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="h-6 w-6 rounded-full border-2 border-accent-primary bg-transparent" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary"
        layout
      />
    </motion.div>
  );
}
