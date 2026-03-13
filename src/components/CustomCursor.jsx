import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Luxury gold cursor with magnetic behavior and ripple effects
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleClick = (e) => {
      // Add ripple
      setRipples(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
      setClicked(true);
      setTimeout(() => setClicked(false), 200);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 600);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseleave", handleLeave);
    document.body.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseleave", handleLeave);
      document.body.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ x: pos.x, y: pos.y, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 500 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* Outer ring with glow */}
        <motion.div
          className="absolute -inset-2 rounded-full border-2 border-gold-primary/80 shadow-glow-md"
          animate={{ scale: clicked ? 1.3 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 rounded-full bg-gold-primary/10 blur filter opacity-50" />
        </motion.div>

        {/* Inner dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-primary shadow-glow-sm"
          animate={{
            scale: clicked ? 1.5 : 1,
            boxShadow: clicked
              ? "0 0 20px rgba(255, 215, 0, 0.8)"
              : "0 0 10px rgba(255, 215, 0, 0.6)",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none fixed left-0 top-0 z-[9998]"
          style={{
            x: ripple.x,
            y: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="h-2 w-2 rounded-full border-2 border-gold-primary" />
        </motion.div>
      ))}
    </>
  );
}
