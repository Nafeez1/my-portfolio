import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollUp}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255,215,0,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center text-black font-bold text-lg"
          style={{
            background: "linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)",
            boxShadow: "0 0 20px rgba(255,215,0,0.4)",
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
